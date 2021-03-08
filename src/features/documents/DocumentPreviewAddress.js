import React from 'react';
import PropTypes from 'prop-types';
import {Box, Grid, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import PreviewAddress from "./PreviewAddress";

const useStyles = makeStyles((theme) => ({
    box: {
        marginLeft: theme.spacing(0.5)
    },
    tableBox: {
        height: '100%',
        padding: theme.spacing(0.2)
    }
}));


const DocumentPreviewAddress = React.memo(function DocumentPreviewAddress({label, add}) {
    const classes = useStyles();
    return <Grid item xs={12} sm={6}>
        <Box border={1} borderColor="grey.main" className={classes.tableBox}>
            <Grid container direction="row">
                <Grid item xs={3}>
                    <Typography component="div" className={classes.box} variant="subtitle1">
                        <Box fontWeight="fontWeightBold" lineHeight={1.2}>
                            {label}
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography component="div" className={classes.box}>
                        <Box lineHeight={1.2} borderColor="grey.main">
                            <PreviewAddress add={add}/>
                        </Box>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    </Grid>
})

DocumentPreviewAddress.propTypes = {
    label: PropTypes.string,
    address: PropTypes.object,

}

export default DocumentPreviewAddress;