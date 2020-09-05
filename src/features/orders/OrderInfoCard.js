import React from 'react';
import { Card, Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../constants.js';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        height: 260,
        minHeight: 260,
        minWidth: 360,
        display: 'flex',
        flexFlow: 'column',
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
        minHeight: 52
    },
    title: {
        fontWeight: 'bold'
    },
    edit: {
        width: '10%',
        height: '80%'
    },
    bottomPanel: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexFlow: 'column',
        flex: '1 1 auto'
    }
}));

const { editButton } = LANGUAGE.order.orderInfoCard;

export default function OrderInfoCard({ title, onEdit, children }) {
    const classes = useStyles();

    return (
        <Card className={ classes.root } elevation={3}>
            <Grid container className={ classes.container }>
                <Grid
                    item
                    className={ classes.topPanel }
                    xs={ 12 }
                >
                    <Typography
                        variant="h5"
                        className={ classes.title }
                    >{ title }
                    </Typography>
                    {onEdit && <ThemedButton
                        onClick={ onEdit }
                        text={ editButton }
                        variant="outlined"
                        styles={ classes.edit }
                    /> }
                </Grid>
                <Divider/>
                <Grid item className={ classes.bottomPanel } xs={ 12 }>
                    { children }
                </Grid>
            </Grid>
        </Card>
    )
}