import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ErrorDisplay from './ErrorDisplay.js';
import ThemedButton from '../buttons/ThemedButton.js';
import { LANGUAGE } from '../../../app/constants.js';

const { backButtonLabel } = LANGUAGE.shared.components.errorPage;

const ErrorPage = React.memo(function ErrorPage({ errors }) {
    const history = useHistory();
    const onClick = () => history.push('/home');
    return (
        <>
            <ErrorDisplay errors={ errors }/>
            <ThemedButton onClick={ onClick }>
                { backButtonLabel }
            </ThemedButton>
        </>
    )
});

ErrorPage.propTypes = {
    errors: PropTypes.array.isRequired
};

export default ErrorPage;