import { ENGLISH } from 'languages/english/english.js';
import { ENGLISH_ERRORS } from 'languages/english/errors.js';
import { CHINESE } from 'languages/chinese/chinese.js';

function getCurrentLocale() {
    const locales =
        navigator.languages === undefined
            ? [navigator.language]
            : navigator.languages;
    for (const locale of locales) {
        const curr = locale.split('-');
        if (curr[0] === 'zh' || curr[0] === 'en') return curr[0];
    }
    return 'en';
}

export const currentLocale = getCurrentLocale();
const languages = {
    en: ENGLISH,
    zh: CHINESE,
};
const backendErrors = {
    en: ENGLISH_ERRORS,
};

// The language package used for the application
export const LANGUAGE = languages['zh'];
export const LOCALE = 'zh';
export const BACKEND_ERRORS = backendErrors[currentLocale];

const SERVER_URI =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_REMOTE_SERVER_URI
        : process.env.REACT_APP_LOCAL_SERVER_URI;

export const AXIOS_REQUEST_CONFIG = {
    baseURL: `${SERVER_URI}/api`,
};
