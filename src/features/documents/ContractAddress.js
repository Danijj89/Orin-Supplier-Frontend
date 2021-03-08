import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import PreviewAddress from "./PreviewAddress";

const useStyles = makeStyles((theme) => ({
    title: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    tableBox: {
        height: '100%',
        padding: theme.spacing(0.2)
    }
}));


const ContractAddress = React.memo(function ContractAddress({label, add}){
    const classes = useStyles();
    return <Grid item xs={4} container direction="column">
        <Typography className={classes.title} variant="subtitle2">
            {label}
        </Typography>
        <PreviewAddress add={add} />
    </Grid>
})

ContractAddress.propTypes = {
    label: PropTypes.string,
    address: PropTypes.object,

}

export default ContractAddress;