import React from 'react';
import PropTypes from 'prop-types';
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

const ErrorMessages = React.memo(function ErrorMessages({ error = [], className }) {
    const classes = useStyles();
    const errors = Array.isArray(error) ? error : [error];
    return (
        <List className={ className }>
            { errors.length > 0 && errors.map((error, index) =>
                <ListItem key={ index } className={ classes.listItem }>
                    <ListItemText primary={ error } className={ classes.error }/>
                </ListItem>
            ) }
        </List>
    )
});

ErrorMessages.propTypes = {
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    className: PropTypes.string
};

export default ErrorMessages;