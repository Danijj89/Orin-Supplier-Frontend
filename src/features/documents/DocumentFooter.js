import React from 'react';
import PropTypes from 'prop-types';
import {Box, Grid, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    footer: {
        margin: theme.spacing(2)
    },
    box: {
        marginTop: theme.spacing(0.5),
        marginLeft: theme.spacing(0.5),
    },
}));


const DocumentFooter = React.memo(function DocumentFooter({label1, text1, label2, text2, variant}){
    const classes = useStyles();
    return <Grid container xs={12} className={classes.footer}>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
            <Box height="100%" border={1} borderColor="grey.main">
                <Typography component="div" className={classes.box} variant="caption">
                    <Box fontWeight="fontWeightBold" lineHeight={1.2}>
                        {label1}
                    </Box>
                </Typography>
                <Typography component="div" className={classes.box}>
                    {text1}
                </Typography>
            </Box>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
            <Box height="80px" border={1} borderColor="grey.main">
                <Typography component="div" className={classes.box} variant="caption">
                    <Box fontWeight="fontWeightBold" lineHeight={1.2}>
                        {label2}
                    </Box>
                </Typography>
                <Typography component="div" className={classes.box}>
                    {text2}
                </Typography>
            </Box>
        </Grid>
        <Grid item xs={1}></Grid>

    </Grid>
})

DocumentFooter.propTypes = {
    label1: PropTypes.string,
    text1: PropTypes.string,
    label2: PropTypes.string,
    text2: PropTypes.string,
    variant: PropTypes.string,
}

export default DocumentFooter;