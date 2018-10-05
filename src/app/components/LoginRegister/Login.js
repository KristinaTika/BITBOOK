import React, { Component } from 'react';
import { usersServices } from "../../../services/usersServices";
import PropTypes from 'prop-types';

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            error: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(e) {
        this.setState({ error: null });
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault()
        const { username } = this.state;
        const { password } = this.state;

        const loginUserData = {
            username,
            password
        }

        usersServices.loginUser(loginUserData)
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    this.setState({ error: response.error.message })
                } else if (!this.state.error) {
                    localStorage.setItem('sessionId', response.sessionId);
                    this.props.onSuccessfulLogin();
                }
            })
            .then(() => {
                usersServices.fetchProfile()
                    .then(response => window.localStorage.setItem("userId", response.userId))
            });

        this.setState({
            username: "",
            password: "",
        });
    }

    render() {
        const { username, password, error } = this.state;
        return (
            <div className="row login-form">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="username" type="text" className="validate" name="username" value={username} onChange={this.handleChange} />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate" name="password" value={password} onChange={this.handleChange} />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="col s12">
                            <a className="#e57373 red lighten-2 btn" disabled={error || !password || !username} onClick={this.handleLogin} type="submit" name="action">Login</a>
                            <p>{error}</p>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
Login.propTypes = {
    onSuccessfulLogin: PropTypes.func.isRequired
}