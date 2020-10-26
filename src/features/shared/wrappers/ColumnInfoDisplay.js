import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    labels: {
        margin: theme.spacing(0.3),
        fontWeight: 'bold',
    },

    content: {
        margin: theme.spacing(0.3),
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
}));

export default function ColumnInfoDisplay({
    leftLabels = [],
    leftData = [],
    rightLabels = [],
    rightData = [],
}) {
    const classes = useStyles();
    let zippedDataRight = rightLabels.map((info, i) => [info, rightData[i]])
    let zippedDataLeft = leftLabels.map((info, i) => [info, leftData[i]])

    return (
        <Grid container>
            <Grid container className={classes.container} item xs={12} md={6}>
                {zippedDataLeft.map((displayItem, i) => 
                <Grid container item key={i}>
                    <Grid 
                        container 
                        alignItems="flex-start" justify="flex-end"
                        item
                        wrap="wrap"
                        xs={4}>
                    <Typography 
                        className={classes.labels}
                        align="right" >
                            {displayItem[0]}
                    </Typography>
                    </Grid>
                    <Grid 
                        container
                        item
                        justify="center"
                        xs={1}>
                    <Divider 
                        orientation="vertical" 
                        flexItem />
                    </Grid>
                    <Grid  
                        alignItems="flex-start"
                        item
                        wrap="wrap"
                        xs={7}>
                    <Typography 
                        className={classes.content}
                        align="left">
                            {displayItem[1]}
                    </Typography>
                    </Grid>
                </Grid>
                )}
            </Grid>
            <Grid 
                container 
                className={classes.container} 
                item xs={12} 
                md={6} 
                direction="column">
                {zippedDataRight.map((displayItem, i) => 
                <Grid container item key={i}>
                    <Grid 
                        container 
                        alignItems="flex-start" justify="flex-end"
                        item
                        wrap="wrap"
                        xs={4}>
                    <Typography 
                        className={classes.labels}
                        align="right">
                            {displayItem[0]}
                    </Typography>
                    </Grid>
                    <Grid 
                        container
                        item
                        justify="center"
                        xs={1}>
                    <Divider 
                        orientation="vertical" 
                        flexItem />
                    </Grid>
                    <Grid  
                        alignItems="flex-start"
                        item
                        wrap="wrap"
                        xs={7}>
                    <Typography 
                        className={classes.content}
                        align="left">
                            {displayItem[1]}
                    </Typography>
                    </Grid>
                </Grid>
                )}
            </Grid>
        </Grid>
    );
}

ColumnInfoDisplay.propTypes = {
    leftLabels: PropTypes.array,
    rightLabels: PropTypes.array,
    leftData: PropTypes.array,
    rightData: PropTypes.array,
};
