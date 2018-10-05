import React, { Component, Fragment } from 'react';
import { usersServices } from '../../services/usersServices';
import '../../css/profilePage.css'
import { Loader } from '../partials/Loader';

export class UserPage extends Component {
    constructor(props) {
        super();

        this.state = {
            user: null
        }
        this.loadProfile = this.loadProfile.bind(this);
    }

    componentDidMount() {
        this.loadProfile();
    }

    loadProfile() {
        const { id } = this.props.match.params;
        usersServices.fetchSingleUser(id)
            .then(user => this.setState({ user: user }));
    }

    render() {
        const { user } = this.state;

        if (user === null) {
            return <Loader />
        }
        return (
            <Fragment>
                <div className='container'>
                    <div className='col s12 center'>
                        <div className='row'>
                            {user.avatarUrl === ""
                                ? <img src="http://www.iglax.org/wp-content/uploads/2014/12/placeholder-Copy-11-1.png" className='responsive-img circle img' alt={user.name} />
                                : <img src={user.avatarUrl} alt={user.name} className='responsive-img circle img' />}
                        </div>
                        <div className='row profile-name'>
                            <h4>{user.name}</h4>
                        </div>
                        <div className='row'>
                            <p className='about-short'>
                                {user.aboutShort}
                            </p>
                        </div>
                        <div className='row'>
                            <div className='col s12 m6'>
                                <button type="button" className="btn btn-light comment-button" ><i className="fas fa-circle"></i> {user.postsCount} Posts</button>
                            </div>
                            <div className='col s12 m6'>
                                <button type="button" className="btn btn-light comment-button"><i className="fas fa-circle"></i> {user.commentsCount} Comments</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

