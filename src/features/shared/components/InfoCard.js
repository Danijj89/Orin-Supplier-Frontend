import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Card, Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'column',
        overflow: 'auto',
        margin: theme.spacing(3)
    },
    container: {
        height: '100%',
        flexFlow: 'column',
        flex: '1 1 auto'
    },
    topPanel: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        color: theme.palette.tertiary['700'],
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flex: '0 1 auto',
        height: 52
    },
    title: {
        fontWeight: 'bold'
    },
    buttons: {
        display: 'flex',
        height: '80%'
    },
    bottomPanel: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: 'flex',
        flexFlow: 'column',
        flex: '1 1 auto'
    }
}));

export default function InfoCard({ title, children, button, className }) {
    const classes = useStyles();

    return (
        <Card className={ clsx(classes.root, className) }>
            <Grid container className={ classes.container }>
                <Grid
                    item
                    className={ classes.topPanel }
                    xs={ 12 }
                >
                    <Typography variant="h5" className={ classes.title }>{ title }</Typography>
                    { button && <Box className={ classes.buttons }>{ button }</Box> }
                </Grid>
                <Divider/>
                <Grid item className={ classes.bottomPanel } xs={ 12 }>
                    { children }
                </Grid>
            </Grid>
        </Card>
    )
}

InfoCard.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element,
    button: PropTypes.element
};