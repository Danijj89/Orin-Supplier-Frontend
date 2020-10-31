import React from 'react';
import PropTypes from 'prop-types';
import ThemedButton from '../buttons/ThemedButton.js';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'fixed',
        bottom: 0,
        backgroundColor: theme.palette.grey.main,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        width: '100%'
    }
}));

export default function Footer({ prevLabel, nextLabel, onPrevClick, onNextClick }) {
    const classes = useStyles();

    return (
        <Box className={ classes.container }>
            <ThemedButton onClick={ onPrevClick }>
                { prevLabel }
            </ThemedButton>
            <ThemedButton onClick={ onNextClick }>
                { nextLabel }
            </ThemedButton>
        </Box>
    )
}

Footer.propTypes = {
    prevLabel: PropTypes.node.isRequired,
    nextLabel: PropTypes.node.isRequired,
    onPrevClick: PropTypes.func.isRequired,
    onNextClick: PropTypes.func.isRequired
};