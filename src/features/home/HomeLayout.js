import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SidePanel from './SidePanel.js';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'auto',
        minHeight: '100%',
        backgroundColor: theme.palette.backgroundSecondary.main,
        flexWrap: 'nowrap'
    },
    leftPanel: {
        height: 'auto',
        minHeight: '100%',
        backgroundColor: theme.palette.backgroundPrimary.main,
        width: 220,
        minWidth: 220
    },
    rightPanel: {
        height: 'auto',
        minHeight: '100%',
        minWidth: 1000,
        flex: '1 0 auto'
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