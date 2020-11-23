import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ErrorMessages from './ErrorMessages.js';
import ThemedButton from '../buttons/ThemedButton.js';
import { LANGUAGE } from '../../../app/constants.js';
import Box from '@material-ui/core/Box';

const { backButtonLabel } = LANGUAGE.shared.components.errorPage;

const ErrorPage = React.memo(function ErrorPage({ errors, className }) {
    const history = useHistory();
    const onClick = () => history.push('/home/settings');



    return (
        <Box className={ className }>
            <ErrorMessages errors={ errors }/>
            <ThemedButton onClick={ onClick }>
                { backButtonLabel }
            </ThemedButton>
        </Box>
    )
});

ErrorPage.propTypes = {
    errors: PropTypes.array.isRequired,
    className: PropTypes.string
};

export default ErrorPage;