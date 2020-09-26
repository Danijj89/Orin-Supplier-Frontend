import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SidePanel from './SidePanel.js';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'auto',
        minHeight: '100%',
        backgroundColor: theme.palette.backgroundSecondary.main
    },
    leftPanel: {
        height: 'auto',
        minHeight: '100%',
        backgroundColor: theme.palette.backgroundPrimary.main,
        maxWidth: '20%',
        minWidth: 200
    },
    rightPanel: {
        height: 'auto',
        minHeight: '100%',
        flex: 1
    }
}));

export default function HomeLayout({ children }) {
    const classes = useStyles();
    return (
        <Grid container className={ classes.root }>
            <Grid item className={ classes.leftPanel }>
                <SidePanel/>
            </Grid>
            <Grid item className={ classes.rightPanel }>
                { children }
            </Grid>
        </Grid>
    );
}