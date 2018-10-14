import React, { Component, Fragment } from 'react';
import { postsServices } from '../../services/postsServices';
import { FeedList } from '../components/Feed/FeedList';
import { CreatePostButton } from '../components/Feed/CreatePostButton';
import { CreatePostModal } from "../components/Feed/CreatePostModal";
import { FilterPostsDropDown } from "../components/Feed/FilterPostsDropDown"

export class FeedPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            newPostType: '',
            filteredPosts: [],
            selectedPostFilter: "allPosts",
            profile: null,
            error: ""
        }
        this.loadPosts = this.loadPosts.bind(this);
        this.handlerPostType = this.handlerPostType.bind(this);
        this.filterPosts = this.filterPosts.bind(this);
    }

    componentDidMount() {
        this.loadPosts();
    }

    loadPosts() {
        postsServices.fetchPosts()
            .then(data => this.setState({
                posts: data,
                filteredPosts: data
            }))
            .catch(err => {
                this.setState({
                    error: err.message,
                });
            });
    }

    handlerPostType(e) {
        if (e.target.parentElement.name === 'modalPost') {
            this.setState({
                newPostType: 'text'
            });
        } else if (e.target.parentElement.name === 'modalImage') {
            this.setState({
                newPostType: 'image'
            });
        } else if (e.target.parentElement.name === 'modalVideo') {
            this.setState({
                newPostType: 'video'
            });
        }
    }

    filterPosts(e) {
        const { posts } = this.state;
        if (e.target.value === 'text') {
            const filteredPosts = posts.filter(post => post.type.includes('text'));
            this.setState({
                filteredPosts,
                selectedPostFilter: e.target.value
            });

        } else if (e.target.value === 'imageUrl') {
            const filteredPosts = posts.filter(post => post.type.includes('image'));
            this.setState({
                filteredPosts,
                selectedPostFilter: e.target.value
            });

        } else if (e.target.value === 'videoUrl') {
            const filteredPosts = posts.filter(post => post.type.includes('video'));
            this.setState({
                filteredPosts,
                selectedPostFilter: e.target.value
            });

        } else if (e.target.value === "allPosts") {
            const filteredPosts = posts;
            this.setState({
                filteredPosts,
                selectedPostFilter: e.target.value
            });
        }
    }

    handleSubmit = (inputValue) => {
        let { newPostType } = this.state;
        const userId = localStorage.getItem('userId');
        const newPost = {
            date: Date.now(),
            userId: userId,
            userDisplayName: "NoReturn",
            type: newPostType,
            numOfComments: 0,
        }
    
        if (newPostType === "text") {
            newPost["text"] = inputValue;

        } else if (newPostType === "image") {
            newPost["imageUrl"] = inputValue;

        } else if (newPostType === "video") {
            newPost["videoUrl"] = inputValue.replace("watch?v=", "embed/");
        }

        postsServices.createNewPost(newPost, newPostType)
            .then(response => response.json())
            .then(newPost => {
                this.setState({ newPostType: null });
                this.loadPosts();
                this.setState({ selectedPostFilter: "allPosts" });
            })
            .catch(err => {
                this.setState({
                    error: err.message,
                });
            });
    }

    handleClose = () => this.setState({ newPostType: null });

    render() {
        const { filteredPosts, newPostType, selectedPostFilter } = this.state;
        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col s10">
                            <FeedList posts={filteredPosts} />
                        </div>
                        <div className="col s2">
                            <FilterPostsDropDown filterPosts={this.filterPosts} selectedPostFilter={selectedPostFilter} />
                            <CreatePostModal 
                            newPostType={newPostType} 
                            handleSubmit={this.handleSubmit} 
                            loadPosts={this.loadPosts} 
                            handleClose={this.handleClose} 
                            />
                            <CreatePostButton handlerPostType={this.handlerPostType} />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
};



