import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SidePanel from './SidePanel.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from './duck/selectors.js';
import { fetchAutocompleteOptions } from './duck/thunks.js';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'auto',
        minHeight: '100%',
        minWidth: '100%',
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
        width: 800,
        flex: '1 0 auto'
    }
}));

export default function Home({ children }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);

    useEffect(() => {
        dispatch(fetchAutocompleteOptions(user.company._id))
    }, [dispatch, user.company._id]);

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