import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Card, Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'column',
        overflow: 'auto',
    },
    container: {
        height: '100%',
        flexFlow: 'column',
        flex: '1 1 auto',
    },
    topPanel: {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
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
        fontWeight: 'bold',
    },
    bottomPanel: {
        display: 'flex',
        flexFlow: 'column',
        flex: '1 1 auto',
        justifyContent: 'center',
    },
}));

const InfoCard = React.memo(function InfoCard(
    {
        title,
        content,
        className,
        tools,
    }) {
    const classes = useStyles();

    return (
        <Card className={ clsx(classes.root, className) }>
            <Grid container className={ classes.container }>
                <Grid item className={ classes.topPanel } xs={ 12 }>
                    <Typography variant="subtitle1" className={ classes.title }>
                        { title }
                    </Typography>
                    { tools && tools.map((tool, idx) =>
                        React.cloneElement(tool, {
                            key: `${ title }-card-${ idx }`
                        })
                    ) }
                </Grid>
                <Divider/>
                <Grid item className={ classes.bottomPanel } xs={ 12 }>
                    { content }
                </Grid>
            </Grid>
        </Card>
    );
});

InfoCard.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.element.isRequired,
    className: PropTypes.string,
    tools: PropTypes.arrayOf(PropTypes.element),
};

export default InfoCard;
