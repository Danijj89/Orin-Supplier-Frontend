import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    box: {
        padding: theme.spacing(2)
    },
    row: {
        display: 'flex',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    labels: {
        fontWeight: 'bold',
        marginRight: theme.spacing(2)
    }
}));

export default function ColumnInfoDisplay({ columns }) {
    const classes = useStyles();

    return (
        <Grid className={ classes.container } container>
            { columns.map((column, i) =>
                <Grid key={i} direction="column" alignItems="center" className={classes.box}>
                    { column.map((row, j) =>
                        <Box key={j} className={ classes.row }>
                            <Typography className={ classes.labels } component="span">{ row.label }</Typography>
                            <Typography component="span">{ row.value }</Typography>
                        </Box>
                    ) }
                </Grid>
            ) }
        </Grid>
    );
}

ColumnInfoDisplay.propTypes = {
    leftLabels: PropTypes.array,
    rightLabels: PropTypes.array,
    leftData: PropTypes.array,
    rightData: PropTypes.array,
};
