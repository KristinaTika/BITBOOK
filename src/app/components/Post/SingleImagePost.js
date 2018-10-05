import React from 'react';
import "../../../css/feedPage.css";
import { postsServices } from "../../../services/postsServices";
import PropTypes from 'prop-types';

export const SingleImagePost = (props) => {

    const { id, userId } = props.post;
    const loggedUserId = JSON.parse(localStorage.getItem("userId"));

    const onDelete = (event) => {
        event.preventDefault();
        postsServices.deleteSinglePost(id)
            .then(() => props.onDelete());
    }

    return (
        <div className="row">
            <div className="col s12">
                <div className="card">
                    <div className="card-image">
                        <img src={props.post.imageUrl} alt='img' />
                    </div>
                    <div className="card-action"></div>
                </div>
                {loggedUserId === userId && <button className="comment-button" onClick={onDelete}>Delete</button>}
            </div>
        </div>
    );
}
SingleImagePost.propTypes = {
    post: PropTypes.object.isRequired
}