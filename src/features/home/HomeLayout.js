import React from 'react';
import SidePanel from './SidePanel.js';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'auto',
        minHeight: '100%',
        backgroundColor: theme.palette.backgroundSecondary.main,
    },
    leftPanel: {
        height: 'auto',
        minHeight: '100%',
        backgroundColor: theme.palette.backgroundPrimary.main
    },
    rightPanel: {
        height: 'auto',
        minHeight: '100%'
    }
}));

export default function HomeLayout({ children }) {
    const classes = useStyles();
    return (
        <Grid container className={ classes.root }>
            <Grid item xs={ 2 } className={ classes.leftPanel }>
                <SidePanel/>
            </Grid>
            <Grid item xs={ 10 } className={ classes.rightPanel }>
                { children }
            </Grid>
        </Grid>
    );
}