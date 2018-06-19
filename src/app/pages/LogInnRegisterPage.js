import React, { Component } from 'react';
import loginnregister from "../../css/loginnregister.css"
import { Login } from '../components/LoginRegister/Login';
import { Register } from '../components/LoginRegister/Register'

export class LogInnRegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullNameInput:"",
            loginTab: true
        }
    }

    tabLoginClick = () =>{
        this.setState({
            loginTab: true
        });
    }

    tabRegisterClick = () =>{
        this.setState({
            loginTab: false
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s7">
                        <h1>BitBook {`${this.state.loginTab ? "Login" : "Register" }`} </h1>
                        <p className="login-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet dictum mauris. Etiam faucibus tempor ex, vitae maximus lectus finibus non. Vestibulum aliquet dui a feugiat sollicitudin. Etiam elementum imperdiet purus eget dapibus. In hac habitasse platea dictumst. Nam posuere porta mauris et aliquet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce sed dapibus odio, vel mollis diam.</p>
                    </div>
                    <div className="col s5">
                        <div className="row">
                            <div className="form-wrapper">
                                <div className="col s6">
                                    <p className={`${this.state.loginTab ? "active" : "" }`} onClick={this.tabLoginClick}>Login</p>
                                </div>
                                <div className="col s6">
                                    <p className={`${this.state.loginTab ? "" : "active" }`} onClick={this.tabRegisterClick}>Register</p>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                     {
                                         this.state.loginTab ? <Login /> : <Register />
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

