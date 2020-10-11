import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar.js';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'auto',
        minHeight: '100%',
        minWidth: '100%',
        backgroundColor: theme.palette.backgroundSecondary.main,
        flexWrap: 'nowrap',
    },
    content: {
        height: 'auto',
        minHeight: '100%',
        flex: '1 0 auto',
    },
}));

export default function Home({ children }) {
    const classes = useStyles();

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            className={classes.root}
        >
            <Grid item>
                <NavBar />
            </Grid>

            <Grid item className={classes.content}>
                {children}
            </Grid>
        </Grid>
    );
}
