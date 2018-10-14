import React, { Component, Fragment } from 'react';
import { postsServices } from '../../services/postsServices';
import { SingleTextPost } from '../components/Post/SingleTextPost';
import { SingleVideoPost } from '../components/Post/SingleVideoPost';
import { SingleImagePost } from '../components/Post/SingleImagePost';
import { SingleComment } from '../components/Post/SingleComment';
import { commentsServices } from '../../services/commentsServices';
import '../../css/postPage.css';
import { Loader } from '../partials/Loader';
import PropTypes from 'prop-types';

export class PostPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post: null,
            comments: [],
            inputValue: "",
        }
        this.loadSinglePost = this.loadSinglePost.bind(this);
        this.loadComments = this.loadComments.bind(this);
        this.displayPost = this.displayPost.bind(this);
        this.onSuccessfulDelete = this.onSuccessfulDelete.bind(this);
        this.loadNewComment = this.loadNewComment.bind(this);
    }

    componentDidMount() {
        const { id, type } = this.props.match.params;
        this.loadSinglePost(type, id);
        this.loadComments(id);
        this.setState({ postId: id });
    }

    loadSinglePost(type, postId) {
        postsServices.fetchSinglePost(type, postId)
            .then(post => this.setState({ post }));
    }

    loadComments(commentId) {
        commentsServices.fetchComments(commentId)
            .then(comments => this.setState({ comments }));
    }

    displayPost() {
        const { type } = this.state.post;
        const { post } = this.state;
        switch (type) {
            case 'text':
                return <SingleTextPost post={post} onDelete={this.onSuccessfulDelete} />
            case 'image':
                return <SingleImagePost post={post} onDelete={this.onSuccessfulDelete} />
            case 'video':
                return <SingleVideoPost post={post} onDelete={this.onSuccessfulDelete} />
            default:
                return <p>Invalid type of input</p>
        }
    }

    onSuccessfulDelete() {
        this.props.history.push("/feed");
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ inputValue: e.target.value });
    }

    loadNewComment(event) {
        const { inputValue } = this.state;
        const { id } = this.props.match.params;
        const comment = {
            body: inputValue,
            postId: this.state.post.id,
        }

        if (inputValue === "") {
            event.preventDefault();
        } else {
            commentsServices.addComment(comment)
                .then(response => response.json())
                .then(newPost => {
                    this.loadComments(id)
                    this.setState({inputValue: ''});
                })
        }
    }

    render() {
        const { comments, post, inputValue } = this.state;
        if (!comments) {
            return <Loader />
        }
        return (
            <Fragment>
                <div className="container">
                    {post === null ? "" : this.displayPost()}
                    <br />
                    <div className="row">
                        <div className="input-field">
                            <input type="text" id="autocomplete-input" className="autocomplete col s11" placeholder='Add your comment' onChange={this.handleChange} value={inputValue} />
                            <label htmlFor="autocomplete-input" ></label>
                            <div className='col s1'>
                                <button className="btn waves-effect waves-light comment-button" type="submit" disabled={!inputValue} name="action" onClick={this.loadNewComment}>SEND</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <ul className="collection">
                            {comments.map((comment, i) => <SingleComment comment={comment} key={i} />)}
                        </ul>
                    </div>
                </div>
            </Fragment>
        );
    }
}
PostPage.propTypes = {
    history: PropTypes.object.isRequired
}