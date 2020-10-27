import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Divider } from '@material-ui/core';
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
    }
}));

export default function ColumnInfoDisplay({ leftData, rightData }) {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid container className={classes.container} item xs={12} md={6}>
                {leftData.map((displayItem, i) =>
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
                            {displayItem.label}
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
                            {displayItem.value}
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
                {rightData.map((displayItem, i) =>
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
                            {displayItem.label}
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
                            {displayItem.value}
                    </Typography>
                    </Grid>
                </Grid>
                )}
            </Grid>
        </Grid>
    );
}

ColumnInfoDisplay.propTypes = {
    leftData: PropTypes.array.isRequired,
    rightData: PropTypes.array
};
