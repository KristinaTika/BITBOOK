import React, { Component } from 'react';
import "../../css/loginnregister.css";
import { Login } from '../components/LoginRegister/Login';
import { Register } from '../components/LoginRegister/Register';
import PropTypes from 'prop-types';

export class LogInRegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginTab: true
        }
        this.onRegister = this.onRegister.bind(this);
        this.tabRegisterClick = this.tabRegisterClick.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    tabRegisterClick() { this.setState({ loginTab: false }) };

    onLogin () { this.props.history.push('/feed') };

    onRegister() { this.setState({ loginTab: true }) };

    render() {
        const { loginTab } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col s7">
                        <h1>BitBook {`${loginTab ? "Login" : "Register"}`} </h1>
                        <p className="login-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet dictum mauris. Etiam faucibus tempor ex, vitae maximus lectus finibus non. Vestibulum aliquet dui a feugiat sollicitudin. Etiam elementum imperdiet purus eget dapibus. In hac habitasse platea dictumst. Nam posuere porta mauris et aliquet. 
                        </p>
                    </div>
                    <div className="col s5">
                        <div className="row">
                            <div className="form-wrapper">
                                <div className="col s6">
                                    <p className={loginTab ? "active1" : ""} onClick={this.onRegister}>Login</p>
                                </div>
                                <div className="col s6">
                                    <p className={loginTab ? "" : "active1"} onClick={this.tabRegisterClick}>Register</p>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        {
                                            loginTab ? <Login onSuccessfulLogin={this.onLogin} /> : <Register onSuccessfulRegister={this.onRegister} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
LogInRegisterPage.propTypes = {
    history: PropTypes.object.isRequired
}

