import React from 'react';
import PropTypes from 'prop-types';
import {Box, Grid, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    box: {
        marginLeft: theme.spacing(0.5)
    },
}));


const LongBox = React.memo(function LongBox({label1, value1, label2, value2}) {
    const classes = useStyles();
    return <Grid container>
        <Grid item xs={2}>
            <Box height="100%" border={1} borderColor="grey.main">
                <Typography component="div" className={classes.box} variant="caption">
                    {label1}
                </Typography>
            </Box>
        </Grid>
        <Grid item xs={3}>
            <Box height="100%" border={1} borderColor="grey.main">
                <Typography component="div" display="inline" className={classes.box} variant="caption"
                            style={{wordWrap: "break-word"}}>
                    {value1}
                </Typography>
            </Box>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
            <Box height="100%" border={1} borderColor="grey.main">
                <Typography component="div" className={classes.box} variant="caption">
                    {label2}
                </Typography>
            </Box>
        </Grid>
        <Grid item xs={3}>
            <Box height="100%" border={1} borderColor="grey.main">
                <Typography component="div" className={classes.box} variant="caption">
                    {value2}
                </Typography>
            </Box>
        </Grid>
    </Grid>
})

LongBox.propTypes = {
    label1: PropTypes.string,
    value1: PropTypes.string,
    label2: PropTypes.string,
    value2: PropTypes.string,

}

export default LongBox;