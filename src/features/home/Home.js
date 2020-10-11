import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSessionInfo } from '../../app/duck/thunks.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import { selectUserById } from '../users/duck/selectors.js';

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
    const dispatch = useDispatch();
    const userId = useSelector(selectCurrentUserId);
    const user = useSelector(state => selectUserById(state, userId));


    useEffect(() => {
        dispatch(fetchSessionInfo())
    }, [dispatch]);

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            className={ classes.root }
        >
            <Grid item>
                { user && <NavBar user={ user }/> }
            </Grid>
            <Grid item className={ classes.content }>
                { children }
            </Grid>
        </Grid>
    );
}
