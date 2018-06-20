import React, { Component } from 'react';
import { validationService } from '../../../services/validationService';
import { uploadServices } from '../../../services/uploadServices';

export class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            about: '',
            photo: '',
            switchUpload: true,
            error: null,
            inputFileValue: null
        }
    }

    handleUsername = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleAbout = (event) => {
        this.setState({
            about: event.target.value
        })
    }

    handlePhoto = (event) => {
        this.setState({
            photo: event.target.value
        })

        this.setState({ error: null });
        const valObj = validationService.validateImageForm(event.target.value)

        if (valObj.error) {
            this.setState({ error: valObj.error });
            return;
        }
    }

    switchSourceUpload = (event) => {
        if (this.state.switchUpload) {
            this.setState({
                switchUpload: false
            })

        } else {
            this.setState({
                switchUpload: true
            })
        }
    }

    onImgFileChange = (event) => {
        this.setState({
            inputFileValue: event.target.files[0]
        })
    }

    onImgFileUpload = (event) => {
        const imgFile = this.state.inputFileValue;

        return uploadServices.uploadUserPicture(imgFile)
            .then(photo => this.setState({ photo }));
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.updateUserProfile(this.state.name, this.state.about, this.state.photo);
        this.props.handleClose(event);
    }

    

    render() {
        return (
            <form>
                <div> Username </div>
                <input type="text" value={this.state.name} placeholder={this.props.profile.name} onChange={this.handleUsername} />
                <br />
                <div> About </div>
                <input type="text" value={this.state.about} placeholder={this.props.profile.aboutShort} onChange={this.handleAbout} />
                <div> Upload photo </div>

                {this.state.switchUpload
                    ? <input type="text" value={this.state.photo} placeholder="photo url" onChange={this.handlePhoto} />
                    : <input type="file" onChange={this.onImgFileChange} />
                }

                <div className="switch">
                    <label>
                        from url
                    <input type="checkbox" value={this.state.switchUpload} onClick={this.switchSourceUpload} />
                        <span className="lever"></span>
                        from file
                </label>
                </div>
                <button className="comment-button" onClick={this.onImgFileUpload}> Upload photo </button>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat comment-button" onClick={this.props.handleClose}>Close</button>
                    <button
                        className="modal-close waves-effect waves-green btn-flat comment-button" onClick={this.onSubmit}
                        disabled={this.state.error || !this.state.photo}>
                        Update
                        </button>
                </div>
            </form>
        );
    }
}