import { ENGLISH } from './languages/english';
import { CHINESE } from './languages/chinese';

// The language package used for the application
export const LANGUAGE = CHINESE;

const SERVER_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_REMOTE_SERVER_URI
    : process.env.REACT_APP_LOCAL_SERVER_URI;

export const AXIOS_REQUEST_CONFIG = {
  baseURL: `${SERVER_URI}/api`,
};
