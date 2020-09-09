import { ENGLISH as englishLanguage } from './languages/english';
import { CHINESE as chineseLanguage } from './languages/chinese';
import { CHINESE as chineseLocale, ENGLISH as englishLocale } from './locales.js';

// The language package used for the application
export const LANGUAGE = englishLanguage;
export const LOCALE = englishLocale;

const SERVER_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_REMOTE_SERVER_URI
    : process.env.REACT_APP_LOCAL_SERVER_URI;

export const AXIOS_REQUEST_CONFIG = {
  baseURL: `${SERVER_URI}/api`,
};
