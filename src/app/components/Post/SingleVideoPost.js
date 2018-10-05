import React from 'react';
import { postsServices } from "../../../services/postsServices";
import PropTypes from 'prop-types';

export const SingleVideoPost = (props) => {

    const { id, userId } = props.post;
    const loggedUserId = JSON.parse(localStorage.getItem("userId"));

    const onDelete = (e) => {
        e.preventDefault();
        postsServices.deleteSinglePost(id)
        .then(() => props.onDelete());
    }

    return (
        <div className='video-post'>
            <div className="row">
                <div className="col s12">
                    <div className="card">
                        <div className="card-video video-container">
                            <iframe width='100%' height='300' src={props.post.videoUrl} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                        </div>
                        <div className="card-action"></div>
                    </div>
                </div>
            </div>
            { loggedUserId === userId && <button className="comment-button" onClick={onDelete}>Delete</button> }
        </div>
    );
}
SingleVideoPost.propTypes = {
    post: PropTypes.object.isRequired
}