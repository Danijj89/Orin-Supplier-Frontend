import React from 'react';
import logo from '../../images/orinlogo.png';
import { LANGUAGE } from '../../constants';
import LoginService from './services.js';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSessionInfo } from '../home/slice.js';
import LoginForm from './LoginForm.js';
import LoginImage from './LoginImage.js';

export default function LoginPage() {
    const { signIn, missingAccountText, signUp } = LANGUAGE.login;
    const history = useHistory();
    const dispatch = useDispatch();


    const onSignInClick = async (event, data) => {
        event.preventDefault();
        try {
            const { token, user, company, defaults } = await LoginService.signIn(data);
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('company', JSON.stringify(company));
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('defaults', JSON.stringify(defaults));
            dispatch(setSessionInfo({
                user,
                company,
                defaults
            }));
            history.push('/home');
        } catch (err) {
            console.log(err);
            history.push('/login');
        }
    }

    return (
        <section className="container-fluid h-100">
            <div className="row h-100">
                <div className="col-md-5 mh-100 d-flex align-items-center">
                    <div className="loginPanel">
                        <img src={logo} alt="Logo"/>
                        <h1>{signIn}</h1>
                        <LoginForm onSignInClick={onSignInClick}/>
                        <div>
                            <span className="mr-2">{missingAccountText}</span>
                            <span>{signUp}</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-7 mh-100">
                    <LoginImage />
                </div>
            </div>
        </section>
    )
}