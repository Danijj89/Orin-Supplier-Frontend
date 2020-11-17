import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    label: {
        margin: theme.spacing(0.3),
        fontWeight: 'bold',
        textAlign: 'right'
    },
    value: {
        margin: theme.spacing(0.3),
        textAlign: 'left'
    }
}))

const DividerDataDisplay = React.memo(function DividerDataDisplay({ data, className }) {
    const classes = useStyles();
    return (
        <Grid container className={ clsx(classes.container, className) }>
            { data.map(item =>
                <Grid container item key={ item.label }>
                    <Grid container item justify="flex-end" wrap="wrap" xs={ 4 }>
                        <Typography className={ classes.label }>{ item.label }</Typography>
                    </Grid>
                    <Grid container item justify="center" xs={ 1 }>
                        <Divider orientation="vertical" flexItem/>
                    </Grid>
                    <Grid container item justify="flex-start" wrap="wrap" xs={ 7 }>
                        { React.isValidElement(item.value)
                            ? item.value
                            : <Typography className={ classes.value }>{ item.value }</Typography>
                        }
                    </Grid>
                </Grid>
            ) }
        </Grid>
    )
});

DividerDataDisplay.propTypes = {
    data: PropTypes.array.isRequired,
    className: PropTypes.string
};

export default DividerDataDisplay;