import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {LANGUAGE} from 'app/utils/constants.js';
import DocumentTitleHead from "./DocumentTitleHead";
import DocumentBand from "./DocumentBand";
import DocumentPreviewAddress from "./DocumentPreviewAddress";
import InfoBox from './InfoBox'
import DocumentTable from "./DocumentTable";
import DocumentFooter from "./DocumentFooter";
import {
    GeneratePLTotal
} from './utils/helpers.js';

const {
    plTitle,
} = LANGUAGE.shipment.previewDocs.docsTitles;

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        minWidth: theme.spacing(100)
    }
}));

const PackingListPreview = React.memo(function PackingListPreview({document}) {
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
        <Grid className={classes.root}>
            <Grid container direction="column">
                <Grid item><Typography variant="h5">{plTitle}</Typography></Grid>
                <DocumentTitleHead add={sellerAdd}/>
                <DocumentBand createdAt={document.createdAt} type={document.type} reference={document.ref}/>
            </Grid>
            <Grid container>
                <DocumentPreviewAddress label={"Seller"} add={sellerAdd}/>
                <DocumentPreviewAddress label={"Buyer"} add={consigneeAdd}/>
            </Grid>
            <Grid container>
                <Grid item xs={12} sm={3}>
                    <InfoBox label={"S/C No"} value={scRef ? scRef : ''}/>

                </Grid>
                <Grid item xs={12} sm={3}>
                    <InfoBox label={"Invoice No"} value={ciRef ? ciRef : ' '}/>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <InfoBox label={"Port of Loading"} value={pol ? pol : ' '}/>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <InfoBox label={"Port of Discharge"} value={pod ? pod : ' '}/>
                </Grid>
            </Grid>
            <DocumentTable type={'PL'} items={items} custom1={custom1} custom2={custom2}/>
            {GeneratePLTotal(document.package, netWeight, grossWeight, dimension)}
            <DocumentFooter label1={"Notes"} text1={notes} label2={"Company Chop"} text2={""}/>

        </Grid>
    );
});

PackingListPreview.propTypes = {
    document: PropTypes.object.isRequired
};

export default PackingListPreview;