import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { SESSION_COOKIE } from '../../app/sessionKeys.js';

export default ({ component: Component, isPrivate, ...rest }) => {
    const signed = sessionStorage.getItem(SESSION_COOKIE);
    if (isPrivate && !signed) {
        return <Redirect to='/login' />
    }
    if (!isPrivate && signed) {
        return <Redirect to='/home' />
    }
    return (
        <Route {...rest} render={ props => <Component {...props} /> } />
    )
}

