import { ENGLISH } from './languages/english/english.js';
import { ENGLISH_ERRORS } from './languages/english/errors.js';
import { CHINESE } from './languages/chinese/chinese.js';

const locales =
    navigator.languages === undefined
        ? [navigator.language]
        : navigator.languages;
const currentLocale = 'en';
const languages = {
    en: ENGLISH,
    zh: CHINESE,
};
const backendErrors = {
    en: ENGLISH_ERRORS,
};

// The language package used for the application
export const LANGUAGE = languages[currentLocale];
export const LOCALE = currentLocale;
export const BACKEND_ERRORS = backendErrors[currentLocale];

const SERVER_URI =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_REMOTE_SERVER_URI
        : process.env.REACT_APP_LOCAL_SERVER_URI;

export const AXIOS_REQUEST_CONFIG = {
    baseURL: `${SERVER_URI}/api`,
};
