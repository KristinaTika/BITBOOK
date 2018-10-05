import React from 'react';
import { postsServices } from "../../../services/postsServices";
import PropTypes from 'prop-types';

export const SingleTextPost = (props) => {

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
                    <div className="card-text">
                        <p>{props.post.text}</p>
                    </div>
                    <div className="card-action"></div>
                </div>
            </div>
            {loggedUserId === userId && <button className="comment-button" onClick={onDelete}>Delete</button>}
        </div>
    );
}
SingleTextPost.propTypes = {
    post: PropTypes.object.isRequired
}