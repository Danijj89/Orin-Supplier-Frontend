import React, { Suspense as ReactSuspense } from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader.js';

export default function Suspense({ children }) {

    return (
        <ReactSuspense fallback={ <Loader/> }>
            { children }
        </ReactSuspense>
    )
}

Suspense.propTypes = {
    children: PropTypes.node.isRequired
};
