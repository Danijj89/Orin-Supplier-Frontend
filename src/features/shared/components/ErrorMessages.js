import React from 'react';
import PropTypes from 'prop-types';
import { Box, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    listItem: {
        padding: 0
    },
    error: {
        color: 'red'
    }
})

const ErrorMessages = React.memo(function ErrorMessages({ errors, className }) {
    const classes = useStyles();

    return (
        <Box className={ className }>
            <List>
                { errors.length > 0 && errors.map((error, index) =>
                    <ListItem key={ index } className={ classes.listItem }>
                        <ListItemText primary={ error } className={ classes.error }/>
                    </ListItem>
                ) }
            </List>
        </Box>

    )
});

ErrorMessages.propTypes = {
    errors: PropTypes.array.isRequired,
    className: PropTypes.string
};

export default ErrorMessages;