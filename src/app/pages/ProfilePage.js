import React, { Component, Fragment } from 'react';
import { usersServices } from '../../services/usersServices';
import '../../css/profilePage.css'
import { EditProfileModal } from '../components/Profile/EditProfileModal';
import { Loader } from '../partials/Loader';

export class ProfilePage extends Component {
    constructor(props) {
        super();

        this.state = {
            profile: null,
            showModal: false,
        }
        this.loadProfile = this.loadProfile.bind(this);
        this.updateUserProfile = this.updateUserProfile.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.loadProfile();
    }

    loadProfile() {
        usersServices.fetchProfile()
            .then(response => this.setState({ profile: response }));
    }

    updateUserProfile(name, about, photo) {
        usersServices.updateUserProfile(name, about, photo)
            .then(() => this.loadProfile());
    }

    handleOpenModal(event) {
        event.preventDefault();
        const { name, aboutShort } = this.state.profile;
        this.setState({
            showModal: true,
            name: name,
            about: aboutShort,
        });
    }

    handleClose = (e) => {
        e.preventDefault();
        this.setState({
            showModal: false,
            name: e.target.value,
            about: e.target.value,
            photo: e.target.value
        });
    }

    render() {
        const { profile } = this.state;

        if (profile === null) {
            return <Loader />
        }
        return (
            <Fragment>
                <div className='container'>
                    <div className='col s12 center'>
                        <div className='row'>
                            {profile.avatarUrl === ""
                                ? <img src="http://www.iglax.org/wp-content/uploads/2014/12/placeholder-Copy-11-1.png" alt={profile.name} className='responsive-img circle img' />
                                : <img src={profile.avatarUrl} className='responsive-img circle img' alt={profile.name} />
                            }
                        </div>
                        <div className='row profile-name'>
                            <h4>{profile.name}</h4>
                        </div>
                        <EditProfileModal
                            showModal={this.state.showModal}
                            handleClose={this.handleClose}
                            profile={this.state.profile}
                            updateUserProfile={this.updateUserProfile}
                        />
                        <a className="waves-effect waves-light btn modal-trigger comment-button" onClick={this.handleOpenModal}>Edit Profile</a>
                        <div className='row'>
                            <p className='about-short'>{profile.aboutShort}</p>
                        </div>
                        <div className='row'>
                            <div className='col s12 m6'>
                                <button type="button" className="btn btn-light comment-button" ><i className="fas fa-circle"></i> {profile.postsCount} Posts</button>
                            </div>
                            <div className='col s12 m6'>
                                <button type="button" className="btn btn-light comment-button"><i className="fas fa-circle"></i> {profile.commentsCount} Comments</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

