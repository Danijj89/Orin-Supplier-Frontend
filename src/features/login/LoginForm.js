import React, { useState } from 'react';
import { LANGUAGE } from '../../constants';

export default function LoginForm({ onSignInClick }) {
    const { signIn, email, password } = LANGUAGE.loginForm;
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const onEmailChange = e => setEmailField(e.target.value);
    const onPasswordChange = e => setPasswordField(e.target.value);

    return (
        <form className="loginForm">
            <div className="form-group">
                <label htmlFor="login-email">{email}</label>
                <input
                    id="login-email"
                    className="form-control"
                    type="email"
                    value={emailField}
                    onChange={onEmailChange}
                    autoFocus
                />
            </div>
            <div className="form-group">
                <label htmlFor="login-password">{password}</label>
                <input
                    id="login-password"
                    className="form-control"
                    type="password"
                    value={passwordField}
                    onChange={onPasswordChange}
                />
            </div>
            <button
                type="submit"
                className="btn btn-block"
                onClick={ e => onSignInClick(e, { email: emailField, password: passwordField })}
            >{signIn}</button>
        </form>
    )
}