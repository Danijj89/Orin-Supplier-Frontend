import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ThemedButton from '../buttons/ThemedButton.js';
import { LANGUAGE } from 'app/utils/constants.js';
import Box from '@material-ui/core/Box';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    listItem: {
        padding: 0
    },
    error: {
        color: 'red'
    }
})

const { backButtonLabel } = LANGUAGE.shared.components.errorPage;

const ErrorPage = React.memo(function ErrorPage({ error = [], className }) {
    const classes = useStyles();
    const errors = Array.isArray(error) ? error : [error];
    const history = useHistory();
    const onClick = () => history.push('/home');

    return (
        <Box className={ className }>
            <List className={ className }>
                { errors.length > 0 && errors.map((error, index) =>
                    <ListItem key={ index } className={ classes.listItem }>
                        <ListItemText primary={ error } className={ classes.error }/>
                    </ListItem>
                ) }
            </List>
            <ThemedButton onClick={ onClick }>
                { backButtonLabel }
            </ThemedButton>
        </Box>
    )
});

ErrorPage.propTypes = {
    error: PropTypes.array.isRequired,
    className: PropTypes.string
};

export default ErrorPage;