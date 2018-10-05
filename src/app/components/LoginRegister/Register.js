import React, { Component } from 'react';
import { usersServices } from "../../../services/usersServices"
import { validationService } from '../../../services/validationService';
import PropTypes from 'prop-types';

export class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            name: "",
            email: "",
            password: "",
            error: null,
            registerError: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
            registerError: ""
        });
        const valObj = validationService.validateRegisterForm(e.target.value, e.target.type);

        if (valObj.error) {
            this.setState({ registerError: valObj.error });
            return;
        }
    }

    handleRegister(e) {
        e.preventDefault()
        const { username, name, email, password, error } = this.state;

        const newUserData = {
            username,
            name,
            email,
            password
        }
        usersServices.registerUser(newUserData)
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    this.setState({ error: response.error.message })
                } else if (!error) {
                    this.props.onSuccessfulRegister();
                }
            });

        this.setState({
            username: "",
            name: "",
            email: "",
            password: ""
        });
    }

    render() {
        const { registerError, name, email, password, username } = this.state;
        return (
            <div className="row login-form">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="name" type="text" className="validate" name="name" value={name} onChange={this.handleChange} />
                            <label htmlFor="name">Full Name</label>
                            <p>{registerError}</p>
                        </div>
                        <div className="input-field col s12">
                            <input id="username" type="text" className="validate" name="username" value={username} onChange={this.handleChange} />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate" name="email" value={email} onChange={this.handleChange} />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate" name="password" value={password} onChange={this.handleChange} />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="col s12">
                            <a className="#e57373 red lighten-2 btn" disabled={registerError || !name || !username || !email || !password} onClick={this.handleRegister} type="submit" name="action">Register</a>
                             <p>{ registerError && registerError}</p>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
Register.propTypes = {
    onSuccessfulRegister: PropTypes.func.isRequired
}
