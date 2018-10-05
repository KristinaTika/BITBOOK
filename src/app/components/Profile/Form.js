import React, { Component } from 'react';
import { validationService } from '../../../services/validationService';
import { uploadServices } from '../../../services/uploadServices';
import '../../../css/profilePage.css';
import PropTypes from 'prop-types';

export class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.profile.name,
            about: this.props.profile.aboutShort,
            photo: this.props.profile.avatarUrl,
            switchUpload: true,
            error: null,
            inputFileValue: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handlePhoto = this.handlePhoto.bind(this);
        this.switchSourceUpload = this.switchSourceUpload.bind(this);
        this.onImgFileChange = this.onImgFileChange.bind(this);
        this.onImgFileUpload = this.onImgFileUpload.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e) { this.setState({ [e.target.name]: e.target.value }) };

    handlePhoto(e) {
        this.setState({
            photo: e.target.value
        });

        this.setState({ error: null });
        const valObj = validationService.validateImageForm(e.target.value);

        if (valObj.error) {
            this.setState({ error: valObj.error });
            return;
        }
    }

    switchSourceUpload(e) {
        const { switchUpload } = this.state;
        const { avatarUrl } = this.props.profile;
        if (switchUpload) {
            this.setState({
                switchUpload: false,
                photo: ''
            });
        } else {
            this.setState({
                switchUpload: true,
                photo: avatarUrl
            });
        }
    }

    onImgFileChange(e) { this.setState({ inputFileValue: e.target.files[0] }) };

    onImgFileUpload(e) {
        const imgFile = this.state.inputFileValue;
        return uploadServices.uploadUserPicture(imgFile)
            .then(photo => this.setState({ photo }));
    }

    onSubmit(e) {
        e.preventDefault();
        const { name, about, photo } = this.state;
        const { updateUserProfile, handleClose } = this.props;
        updateUserProfile(name, about, photo);
        handleClose(e);
    }

    render() {
        const { name, about, photo, switchUpload, error } = this.state;
        const { aboutShort } = this.props.profile;

        return (
            <form>
                <div> Username </div>
                <input type="text" value={name} placeholder={this.props.profile.name} name="name" onChange={this.handleChange} />
                <br />
                <div> About </div>
                <input type="text" value={about} placeholder={aboutShort} name="about" onChange={this.handleChange} />
                <div className=" upload-photo"> Upload photo </div>

                {switchUpload
                    ? <input type="text" value={photo} placeholder="photo url" name="about" onChange={this.handlePhoto} />
                    : <input type="file" onChange={this.onImgFileChange} />
                }

                <div className="switch type-upload">
                    <label>
                        from url
                        <input type="checkbox" value={switchUpload} onClick={this.switchSourceUpload} />
                        <span className="lever"></span>
                        from file
                     </label>
                </div>
                <button className="comment-button upload-button" onClick={this.onImgFileUpload}> Upload photo </button>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat comment-button " id="cancel" onClick={this.props.handleClose}>Cancel</button>
                    <button
                        className="modal-close waves-effect waves-green btn-flat comment-button" onClick={this.onSubmit}
                        disabled={error || !photo}>
                        Update
                        </button>
                </div>
            </form>
        );
    }
}
Form.propTypes = {
    profile: PropTypes.object.isRequired,
    updateUserProfile: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
}