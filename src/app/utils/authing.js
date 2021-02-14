import { AuthenticationClient } from 'authing-js-sdk';

export const authing = new AuthenticationClient({
    appId: process.env.NODE_ENV
        ? process.env.REACT_APP_DEV_AUTHING_APP_ID
        : process.env.REACT_APP_DEV_AUTHING_APP_ID,
    appDomain: process.env.REACT_APP_DEV_AUTHING_APP_DOMAIN,
    onError: (code, message, data) => console.log(message)
});