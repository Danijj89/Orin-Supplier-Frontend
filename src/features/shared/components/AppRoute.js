import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { SESSION_COOKIE } from '../../../app/sessionKeys.js';

export default ({ component: Component, isPrivate, ...rest }) => {
    const signed = sessionStorage.getItem(SESSION_COOKIE);
    const expired = new Date() > new Date(JSON.parse(signed));
    if (isPrivate && expired) {
        return <Redirect to='/login' />
    }
    return (
        <Route {...rest} render={ props => <Component {...props} /> } />
    )
}

