import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%',
        flexFlow: 'column',
        flex: '1 1 auto',
    },
    topPanel: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        color: theme.palette.tertiary['700'],
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flex: '0 1 auto',
        height: 52,
    },
    title: {
        fontWeight: 'bold'
    },
    bottomPanel: {
        display: 'flex',
        flexFlow: 'column',
        flex: '1 1 auto'
    },
    buttons: {
        minWidth: 0,
        height: 30
    }
}));

const InfoCard = React.memo(function InfoCard(
    {
        title,
        content,
        className,
        tools,
    }) {
    const classes = useStyles();
    const toolsArray = Array.isArray(tools) ? tools : [tools];

    return (
        <Grid container className={ clsx(classes.container, className) } component={ Paper }>
            <Grid className={ classes.topPanel } container item xs={ 12 }>
                <Typography variant="subtitle1" className={ classes.title }>
                    { title }
                </Typography>
                <Grid container justify="flex-end" alignItems="center" item xs>
                    { tools && toolsArray.map((tool, idx) =>
                        React.cloneElement(tool, {
                            key: `${ title }-card-${ idx }`,
                            className: classes.buttons
                        })
                    ) }
                </Grid>
            </Grid>
            <Divider/>
            <Grid item className={ classes.bottomPanel } xs={ 12 }>
                { content }
            </Grid>
        </Grid>
    );
});

InfoCard.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.element.isRequired,
    className: PropTypes.string,
    tools: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ])
};

export default InfoCard;
