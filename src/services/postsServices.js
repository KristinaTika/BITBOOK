import { postEndpoint, baseEndpoint } from '../shared/constants';
import { get, deleteData, post } from './APIService';
import { TextPost, VideoPost, ImagePost } from '../entities/Post';

class PostsServices {

    fetchPosts() {
        return get(postEndpoint)
            .then(postList => {
                return postList.filter(post => post.videoUrl ? post.videoUrl.includes("youtube") : true);    
            })
            .then(myPostList => {
                return myPostList.map(post => {
                    switch (post.type) {
                        case 'text':
                            return new TextPost(post.id, post.date, post.userId, post.userDisplayName, post.type, post.commentsNum, post.text);
                        case 'image':
                            return new ImagePost(post.id, post.date, post.userId, post.userDisplayName, post.type, post.commentsNum, post.imageUrl);
                        case 'video':
                            return new VideoPost(post.id, post.date, post.userId, post.userDisplayName, post.type, post.commentsNum, post.videoUrl)  ;  
                        default:
                            return "";  
                    }
                });
            });
    }

    fetchSinglePost(type, singlePostId) {
        const urlEndpoint = (`${typeUrl(type)}/${singlePostId}`);
        return get(urlEndpoint);
    }

    createNewPost = (data, type) => {
        let url = typeUrl(type);
        return post(url, data);
    }

    deleteSinglePost = (singlePostId) => {
        const urlEndpoint = (`${postEndpoint}/${singlePostId}`);
        return deleteData(urlEndpoint);
    }
};

const  typeUrl = (type) => {
    let url = '';
    switch (type) {
        case 'text':
            return url = `${baseEndpoint}/TextPosts`;
        case 'image':
            return url = `${baseEndpoint}/ImagePosts`;
        case 'video':
            return url = `${baseEndpoint}/VideoPosts`;
        default:
            return '...'
    }
    // return url;
}

export const postsServices = new PostsServices();
