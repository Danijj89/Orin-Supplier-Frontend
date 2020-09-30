import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column'
    }
}));

export default function FormContainer({ children }) {
    const classes = useStyles();

    return (
        <Box className={ classes.container }>
            { children }
        </Box>
    )
}