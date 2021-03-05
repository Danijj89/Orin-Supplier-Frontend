import React from 'react';
import PropTypes from 'prop-types';
import { Grid , Typography} from '@material-ui/core';
import {GenerateTitleHead, GenerateDocBand, InfoBox, GenerateAddress, GenerateTable, GeneratePLTotal, GenerateFooter} from './utils/helpers.js';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from 'app/utils/constants.js';

const {
    plTitle,
} = LANGUAGE.shipment.previewDocs.docsTitles;

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        minWidth: theme.spacing(100)
    }
}));

const PackingListPreview = React.memo(function PackingListPreview({ document }) {
    const classes = useStyles();
    const {
        sellerAdd,
        consigneeAdd,
        items,
        pol,
        pod,
        custom1,
        custom2,
        ciRef,
        scRef,
        netWeight,
        grossWeight,
        dimension,
        notes
    } = document
    return (
       <Grid className={ classes.root }>
            <Grid container direction = "column">
                <Grid item><Typography variant="h5">{plTitle}</Typography></Grid>
                {GenerateTitleHead(sellerAdd)}     
                {GenerateDocBand(document.createdAt, document.type, document.ref)}
            </Grid>
            <Grid container>
                {GenerateAddress("Seller", sellerAdd)}
                {GenerateAddress("Buyer", consigneeAdd)}
                </Grid>
            <Grid container>
                <Grid item xs={12} sm={3}>
                    {InfoBox("S/C No",  scRef? scRef : '')}
                </Grid>
                <Grid item xs={12} sm={3}>{InfoBox("Invoice No", ciRef? ciRef : ' ' )}</Grid>
                <Grid item xs={12} sm={3}>{InfoBox("Port of Loading", pol? pol : ' ')}</Grid>
                <Grid item xs={12} sm={3}>{InfoBox("Port of Discharge", pod? pod: ' ')}</Grid>
            </Grid>
            {GenerateTable('PL', items, custom1, custom2)}
            {GeneratePLTotal(document.package, netWeight, grossWeight, dimension)}
            {GenerateFooter("Notes", notes)}
        </Grid>
    );
});

PackingListPreview.propTypes = {
    document: PropTypes.object.isRequired
};

export default PackingListPreview;