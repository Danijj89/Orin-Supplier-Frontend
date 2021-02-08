import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { SESSION_COOKIE, SESSION_USER } from 'app/sessionKeys.js';
import { useDispatch } from 'react-redux';
import { cleanAppState } from 'app/duck/slice.js';

export default ({ children, isPrivate, ...rest }) => {
    const dispatch = useDispatch();
    const signed = localStorage.getItem(SESSION_COOKIE);
    const expired = new Date() > new Date(JSON.parse(signed));
    if (isPrivate && expired) {
        dispatch(cleanAppState());
        localStorage.removeItem(SESSION_COOKIE);
        localStorage.removeItem(SESSION_USER);
        return <Redirect to='/login' />
    }
    return (
        <Route {...rest}>
            { children }
        </Route>
    )
}

