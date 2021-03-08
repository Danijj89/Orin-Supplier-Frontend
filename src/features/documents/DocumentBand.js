import React from 'react';
import PropTypes from 'prop-types';
import {Box, Grid, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {format} from "date-fns";

const useStyles = makeStyles((theme) => ({
    band: {
        padding: theme.spacing(1)
    },
}));


const DocumentBand = React.memo(function DocumentBand({createdAt, type, reference}) {
    const classes = useStyles();
    return <Box bgcolor="grey.main" className={classes.band}>
        <Grid container item direction="row"
              justify="space-between"
              alignItems="center">
            <Box color="white.main">Date: {format(new Date(Date.parse(createdAt)), 'MMM d , yyy')}</Box>
            <Box color="white.main">{type.label.en}</Box>
            <Box color="white.main">Doc No.:{reference}</Box>
        </Grid>
    </Box>
})

DocumentBand.propTypes = {
    createdAt: PropTypes.string,
    type: PropTypes.object,
    reference: PropTypes.any,
}

export default DocumentBand;