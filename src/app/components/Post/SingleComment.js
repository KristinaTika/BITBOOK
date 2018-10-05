import React, { Component } from 'react';
import '../../../css/singleComment.css'
import { usersServices } from '../../../services/usersServices';
import PropTypes from 'prop-types';

export class SingleComment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            error: ""
        }
        this.loadSingleUser = this.loadSingleUser.bind(this);
        this.showDate = this.showDate.bind(this);
    }

    componentDidMount() {
        this.loadSingleUser();
    }

    loadSingleUser() {
        const { authorId } = this.props.comment;
        usersServices.fetchSingleUser(authorId)
            .then(user => this.setState({ user }))
            .catch(err => this.setState({ error: err.message }));
    }

    showDate(input) {
        const date = new Date(input);
        const newDate = `posted at: ${date.getHours()}:${date.getMinutes()}h`;
        return newDate;
    }

    render() {
        const { name, avatarUrl } = this.state.user;
        const { body, dateCreated } = this.props.comment;
        const { error } = this.state;
        return (
            <li className="collection-item avatar">
                {error && <p>{error}</p>}
                <div className="col s2">
                    <div className="col s12">
                        <img src={avatarUrl} alt="user-img" className="circle responsive-img avatar-img" />
                    </div>
                    <div className="col s12">{name}</div>
                </div>
                <div className="col s8">
                    <p>{body}</p>
                </div>
                <div className="col s2">
                    <p className="right">{this.showDate(dateCreated)}</p>
                </div>
            </li>
        );
    }
};
SingleComment.propTypes = {
    comment: PropTypes.object.isRequired
}






