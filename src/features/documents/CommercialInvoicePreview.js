import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Typography} from '@material-ui/core';
import {
    GenerateTitleHead,
    GenerateDocBand,
    InfoBox,
    GenerateAddress,
    GenerateTable,
    GenerateFooter,
    GenerateCITotal
} from './utils/helpers.js';
import {makeStyles} from '@material-ui/core/styles';
import {format} from 'date-fns';
import {LANGUAGE} from 'app/utils/constants.js';

const {
    ciTitle,
} = LANGUAGE.shipment.previewDocs.docsTitles;


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        minWidth: theme.spacing(100)
    }
}));

const CommercialInvoicePreview = React.memo(function CommercialInvoicePreview({document}) {
    const classes = useStyles();
    const {
        sellerAdd,
        consigneeAdd,
        items,
        clientRefs,
        pol,
        pod,
        payRefs,
        coo,
        incoterm,
        custom1,
        custom2,
        quantity,
        total,
        marks,
        currency
    } = document

    return (
        <Grid className={classes.root}>
            <Grid container direction="column">
                <Grid item><Typography variant="h5">{ciTitle}</Typography></Grid>
                {GenerateTitleHead(sellerAdd)}
                {GenerateDocBand(document.createdAt, document.type, document.ref)}
            </Grid>
            <Grid container>
                {GenerateAddress("Seller", sellerAdd)}
                {GenerateAddress("Buyer", consigneeAdd)}
            </Grid>
            <Grid container>
                <Grid item xs={12} sm={3}>
                    {InfoBox("Cargo Ready", document.crd ? format(new Date(Date.parse(document.crd)), 'd/M/yyy') : ' ')}
                </Grid>
                <Grid item xs={12} sm={3}>{InfoBox("Order Reference", clientRefs ? clientRefs : ' ')}</Grid>
                <Grid item xs={12} sm={3}>{InfoBox("Port of Loading", pol ? pol : ' ')}</Grid>
                <Grid item xs={12} sm={3}>{InfoBox("Port of Discharge", pod ? pod : ' ')}</Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} sm={3}>{InfoBox("Incoterm", incoterm ? incoterm : ' ')}</Grid>
                <Grid item xs={12} sm={3}>{InfoBox("Country of Manufacture", coo ? coo.label.en : ' ')}</Grid>
                <Grid item xs={12} sm={6}>{InfoBox("Payment No.:", payRefs ? payRefs : ' ')}</Grid>
            </Grid>
            {GenerateTable('CI', items, custom1, custom2, currency)}
            {GenerateCITotal(quantity, total, currency)}
            {GenerateFooter("Marks", marks)}
        </Grid>
    );
});

CommercialInvoicePreview.propTypes = {
    document: PropTypes.object.isRequired
};

export default CommercialInvoicePreview;