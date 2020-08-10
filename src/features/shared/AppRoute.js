import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import HomeLayout from '../home/HomeLayout.js'
import LoginLayout from '../login/LoginLayout.js';


export default ({ component: Component, isPrivate, ...rest }) => {

    const signed = sessionStorage.getItem('token');

    if (isPrivate && !signed) {
        return <Redirect to='/login' />
    }

    if (!isPrivate && signed) {
        return <Redirect to='/home' />
    }

    const Layout = isPrivate ? HomeLayout : LoginLayout;

    return (
        <Route {...rest} render={ props => (
            <Layout>
                <Component {...props} />
            </Layout>
        )} />
    )
}

