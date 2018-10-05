import React, { Component, Fragment } from 'react';
import { validationService } from '../../../services/validationService';
import '../../../css/profilePage.css';
import PropTypes from 'prop-types';

export class CreatePostModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            error: null
        }
        this.closeOnX = this.closeOnX.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.renderTextForm = this.renderTextForm.bind(this);
        this.renderImageForm = this.renderImageForm.bind(this);
        this.renderVideoForm = this.renderVideoForm.bind(this);
    }

    closeOnX(e) {
        this.props.handleClose();
        this.setState({
            inputValue: "",
            error: null
        });
    }

    handleChange(e) {
        this.setState({
            inputValue: e.target.value,
            error: null
        });

        const valObj = validationService.validatePost(e.target.value, this.props.newPostType);

        if (valObj.error) {
            this.setState({ error: valObj.error });
            return;
        }
    };

    onCreate(e) {
        e.preventDefault();
        const { inputValue } = this.state;
        this.props.handleSubmit(inputValue);
        this.setState({ inputValue: "" });
    }

    renderTextForm() {
        const { inputValue } = this.state;
        return (
            <Fragment>
                <h4>New  Post</h4>
                <p>Post content</p>
                <input id="post" type="text" name="newPost" className="validate" value={inputValue}
                    onChange={this.handleChange} />
            </Fragment>
        );
    }

    renderImageForm() {
        const { inputValue } = this.state;
        return (
            <Fragment>
                <h4>New Image Post</h4>
                <p>Image link</p>
                <input id="image" type="text" name="newImage" className="validate" value={inputValue}
                    onChange={this.handleChange} />
            </Fragment>
        );
    }

    renderVideoForm() {
        const { inputValue } = this.state;
        return (
            <Fragment>
                <h4>New Video Post</h4>
                <p>YouTube video link</p>
                <input id="image" type="text" name="newVideo" className="validate" value={inputValue}
                    onChange={this.handleChange} />
            </Fragment>
        );
    }

    render() {
        const { error, inputValue } = this.state;
        const { newPostType } = this.props;
        if (!newPostType) {
            return null;
        }
        return (
            <div className="overlay">
                <div id="modalPost" className="modal open" style={{ display: 'block', top: 150 }}>
                    <div className="modal-content">
                        <i className="material-icons right modal-close" onClick={this.closeOnX} >close</i>

                        {newPostType === 'text' && this.renderTextForm()}
                        {newPostType === 'video' && this.renderVideoForm()}
                        {newPostType === 'image' && this.renderImageForm()}

                        {error && <p>{error}</p>}

                    </div>
                        <div className="modal-footer">
                            <a href="#!" className="modal-close waves-effect waves-green btn-flat comment-button" disabled={error || !inputValue} onClick={this.onCreate}>POST</a>
                        </div>
                </div>
            </div>
        );
    }
};
CreatePostModal.propTypes = {
    newPostType: PropTypes.string
}

