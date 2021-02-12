import React from 'react';
import PropTypes from 'prop-types';
import ThemedButton from '../buttons/ThemedButton.js';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        backgroundColor: theme.palette.grey.main,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        width: '100vw',
        zIndex: 999,
    },
    cancelButton: {
        color: theme.palette.danger.light,
        borderColor: theme.palette.danger.light,
        '&:hover': {
            color: theme.palette.white.main,
            borderColor: theme.palette.danger.dark,
            backgroundColor: theme.palette.danger.main,
        },
        marginRight: theme.spacing(1),
    },
    submitButton: {
        width: theme.spacing(20),
    },
}));

const Footer = React.memo(function Footer(
    {
        prevLabel,
        nextLabel,
        onPrevClick,
        onNextClick,
        prevButtonType,
        nextButtonType
    }) {
    const classes = useStyles();

    return (
        <Box className={ classes.container }>
            <Grid container justify="center"
                  alignItems="center">
                <ThemedButton
                    className={ classes.cancelButton }
                    onClick={ onPrevClick }
                    variant='outlined'
                    type={ prevButtonType }
                >
                    { prevLabel }
                </ThemedButton>
                <ThemedButton
                    className={ classes.submitButton }
                    onClick={ onNextClick }
                    type={ nextButtonType }
                >
                    { nextLabel }
                </ThemedButton>
            </Grid>
        </Box>
    )
});

Footer.propTypes = {
    prevLabel: PropTypes.node.isRequired,
    nextLabel: PropTypes.node.isRequired,
    onPrevClick: PropTypes.func,
    onNextClick: PropTypes.func,
    prevButtonType: PropTypes.string,
    nextButtonType: PropTypes.string
};

export default Footer;