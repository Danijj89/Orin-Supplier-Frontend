import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography} from '@material-ui/core';
// import {InfoBox, GenerateAddress, GenerateTable, GenerateEqualFooter} from './utils/helpers.js';
import { makeStyles } from '@material-ui/core/styles';
// import { format } from 'date-fns';
import { LANGUAGE } from 'app/utils/constants.js';

const {
    ceTitle,
} = LANGUAGE.shipment.previewDocs.docsTitles;

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        minWidth: theme.spacing(100)
    },
    title: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    topM1: {
        marginTop: theme.spacing(2)
    }
}));

const ChinaExportPreview = React.memo(function ChinaExportPreview({ document }) {
    const classes = useStyles();
     const {
        ref,
        // bol,
        // containerNum,
        // createdAt,
        // del,
        // destCountry,
        // exPort,
        // exemption,
        // incoterm,
        // items,
        // mTaxCode,
        // packageTypes,
        // packageUnites,
        // pod,
        // pol,
        // quantity,
        // scRef,
        // sTaxCode,
        // supervision,
        // totGrossWeight,
        // totNetWeight,
        // totalAmount,
        // tradingCountry,
    } = document
    // console.log(document)
    // console.log(document.items)
    return (
        <Grid className={ classes.root }>
            <Grid container direction = "column">
                <Grid item><Typography variant="h5">{ceTitle}</Typography></Grid>
                <Grid item xs={12} className={classes.title}>
                <Typography variant="h5" align="center">
                    中华人民共和国海关出口货物报关单
                </Typography>
                </Grid>
                <Grid item xs={12} className={classes.title} direction="row"
                justify="space-between" container>
                <Typography variant="subtitle1">预录入编号：</Typography>
                <Typography variant="subtitle1">海关编号：{ref}</Typography>
                </Grid>
            </Grid>
            <Typography variant="h4">Coming Soon | 在建立中</Typography>
        </Grid>
    );
});

ChinaExportPreview.propTypes = {
    document: PropTypes.object.isRequired
};

export default ChinaExportPreview;