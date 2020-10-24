import React from 'react';
import { Card, Divider, Grid, Typography, Box, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/constants.js';
import { Check as IconCheck, Clear as IconClear } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        height: 260,
        minHeight: 260,
        minWidth: 360,
        display: 'flex',
        flexFlow: 'column',
        overflow: 'auto'
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
    },
    editCancel: {
        color: 'red'
    },
    editConfirm: {
        color: 'green'
    }
}));


export default function OrderInfoCard({ title, onEdit, isEdit, onCancel, onConfirm, children }) {
    const classes = useStyles();

    return (
        <Card className={ classes.root } elevation={ 3 }>
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
                    { !isEdit && onEdit && <Box className={ classes.buttons }>
                        <ThemedButton
                            onClick={ onEdit }
                            text={ 'edit' }
                            variant="outlined"
                        />
                    </Box> }
                    { isEdit && <Box className={ classes.buttons }>
                        <IconButton
                            className={ classes.editCancel }
                            onClick={ onCancel }
                            size="small"
                        >
                            <IconClear/>
                        </IconButton>
                        <IconButton
                            className={ classes.editConfirm }
                            onClick={ onConfirm }
                            size="small"
                        >
                            <IconCheck/>
                        </IconButton>
                    </Box> }
                </Grid>
                <Divider/>
                <Grid item className={ classes.bottomPanel } xs={ 12 }>
                    { children }
                </Grid>
            </Grid>
        </Card>
    )
}