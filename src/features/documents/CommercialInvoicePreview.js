import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import {
    GenerateCITotal
} from './utils/helpers.js';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';
import { LANGUAGE } from 'app/utils/constants.js';
import DocumentTitleHead from "./DocumentTitleHead";
import DocumentBand from "./DocumentBand";
import DocumentPreviewAddress from "./DocumentPreviewAddress";
import InfoBox from './InfoBox'
import DocumentTable from "./DocumentTable";
import DocumentFooter from "./DocumentFooter";

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
        <Grid className={ classes.root }>
            <Grid container direction="column">
                <Grid item><Typography variant="h5">{ ciTitle }</Typography></Grid>
                <DocumentTitleHead add={ sellerAdd }/>
                <DocumentBand createdAt={ document.createdAt } type={ document.type } reference={ document.ref }/>
            </Grid>
            <Grid container>
                <DocumentPreviewAddress label={ "Seller" } add={ sellerAdd }/>
                <DocumentPreviewAddress label={ "Buyer" } add={ consigneeAdd }/>
            </Grid>
            <Grid container>
                <Grid item xs={ 12 } sm={ 3 }>
                    < InfoBox label={ "Cargo Ready" }
                              value={ document.crd ? format(new Date(Date.parse(document.crd)), 'd/M/yyy') : ' ' }/>
                </Grid>
                <Grid item xs={ 12 } sm={ 3 }>
                    <InfoBox label={ "Order Reference" } value={ clientRefs ? clientRefs : ' ' }/>
                </Grid>
                <Grid item xs={ 12 } sm={ 3 }>
                    <InfoBox label={ "Port of Loading" } value={ pol ? pol : ' ' }/>
                </Grid>
                <Grid item xs={ 12 } sm={ 3 }>
                    <InfoBox label={ "Port of Discharge" } value={ pod ? pod : ' ' }/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={ 12 } sm={ 3 }>
                    <InfoBox label={ "Incoterm" } value={ incoterm ? incoterm : ' ' }/>
                </Grid>
                <Grid item xs={ 12 } sm={ 3 }>
                    <InfoBox label={ "Country of Manufacture" } value={ coo ? coo.label.en : ' ' }/>
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                    <InfoBox label={ "Payment No.:" } value={ payRefs ? payRefs : ' ' }/>
                </Grid>
            </Grid>
            <DocumentTable type={ 'CI' } items={ items } custom1={ custom1 } custom2={ custom2 } currency={ currency }/>
            { GenerateCITotal(quantity, total, currency) }
            <DocumentFooter label1={ "Marks" } text1={ marks } label2={ "Company Chop" } text2={ "" }/>
        </Grid>
    );
});

CommercialInvoicePreview.propTypes = {
    document: PropTypes.object.isRequired
};

export default CommercialInvoicePreview;