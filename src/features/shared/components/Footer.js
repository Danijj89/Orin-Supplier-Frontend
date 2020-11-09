import React from 'react';
import PropTypes from 'prop-types';
import ThemedButton from '../buttons/ThemedButton.js';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'fixed',
        bottom: 0,
        backgroundColor: theme.palette.grey.main,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        width: '100%'
    },
    cancelButton: {
        color: theme.palette.danger.main,
        borderColor: theme.palette.danger.main,
        '&:hover': {
            color: theme.palette.danger.dark,
            borderColor: theme.palette.danger.dark,
        },
        marginRight: theme.spacing(1),
    }
}));

const Footer = React.memo(function Footer({ prevLabel, nextLabel, onPrevClick, onNextClick }) {
    const classes = useStyles();

    return (
        <Box className={ classes.container }>
            <Grid container justify="center"
                alignItems="center">
            <ThemedButton className={classes.cancelButton} onClick={ onPrevClick } variant = 'outlined'>
                { prevLabel }
            </ThemedButton>
            <ThemedButton onClick={ onNextClick }>
                { nextLabel }
            </ThemedButton>
            </Grid>
        </Box>
    )
});

Footer.propTypes = {
    prevLabel: PropTypes.node.isRequired,
    nextLabel: PropTypes.node.isRequired,
    onPrevClick: PropTypes.func.isRequired,
    onNextClick: PropTypes.func.isRequired
};

export default Footer;