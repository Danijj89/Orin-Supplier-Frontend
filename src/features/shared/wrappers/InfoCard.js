import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    Card,
    Divider,
    Grid,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
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
        display: 'flex',
        flexFlow: 'column',
        flex: '1 1 auto',
        justifyContent: 'center'
    }
}));

const InfoCard = React.memo(function InfoCard(
    { title, content, className, button }) {
    const classes = useStyles();

    return (
        <Card className={ clsx(classes.root, className) }>
            <Grid container className={ classes.container }>
                <Grid item className={ classes.topPanel } xs={ 12 }>
                    <Typography variant="h5" className={ classes.title }>{ title }</Typography>
                    { button && React.cloneElement(button, { className: classes.buttons }) }
                </Grid>
                <Divider/>
                <Grid item className={ classes.bottomPanel } xs={ 12 }>
                    { content }
                </Grid>
            </Grid>
        </Card>
    )
});

InfoCard.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.element.isRequired,
    className: PropTypes.string,
    button: PropTypes.element
};

export default InfoCard;