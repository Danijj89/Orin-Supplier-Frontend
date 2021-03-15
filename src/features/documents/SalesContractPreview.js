import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';
import { LANGUAGE } from 'app/utils/constants.js';
import ContractAddress from "./ContractAddress";
import DocumentTable from "./DocumentTable";
import DocumentFooter from "./DocumentFooter";
import LongBox from "./LongBox";

const {
    scTitle,
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


const SalesContractPreview = React.memo(function SalesContractPreview({document}) {
    const classes = useStyles();
    const {
        ref,
        sellerAdd,
        consigneeAdd,
        items,
        currency,
        createdAt,
        total,
        bankDetails,
        customText,
        insurance,
        notes,
        pod,
        pol,
        termsOfPayment,
        timeOfShipment,

    } = document

    return (
        <Grid className={ classes.root }>
            <Grid container direction="column">
                <Grid item><Typography variant="h5">{ scTitle }</Typography></Grid>
                <Grid item xs={ 12 } className={ classes.title }>
                    <Typography variant="h5" align="center">Sales Contract 销售合同</Typography>
                </Grid>
                <Grid item xs={ 12 } className={ classes.title }>
                    <Typography variant="subtitle1">SC 编号 No: { ref }</Typography>
                </Grid>
                <Grid item container xs={ 12 } direction="column">
                    <Typography variant="caption">
                        { 'This Sales Contract (this “Contract) is dated as of ' + format(new Date(Date.parse(createdAt)), 'MMM d , yyy') + ' and is by and between:' }
                    </Typography>
                    <Typography variant="caption">
                        { '本销售合同 （检查‘合同’） 于' + format(new Date(Date.parse(createdAt)), 'MMM d , yyy') + ' 日签订。 由和：' }
                    </Typography>
                </Grid>
                <Grid item container xs={ 12 }>
                    <Grid item xs={ 1 }></Grid>
                    <ContractAddress label={ "BETWEEN The Seller/卖方" } add={ sellerAdd }/>
                    <Grid item xs={ 2 }></Grid>
                    <ContractAddress label={ "BETWEEN The Seller/卖方" } add={ sellerAdd }/>
                    <Grid item xs={ 1 }></Grid>
                </Grid>
                <Grid item container xs={ 12 } direction="column" className={ classes.title }>
                    <Typography variant="caption">
                        This contract is made and executed by and between the Buyer and Seller for the purchase and sale
                        of goods as follows:
                    </Typography>
                    <Typography variant="caption">
                        经卖方和买方双方协商，兹就一下产品和买卖签署本合同:
                    </Typography>
                </Grid>
                <DocumentTable type={ 'SC' } items={ items } custom1={ null } custom2={ null } currency={ currency }/>
                <Typography variant="caption">
                    { 'Total Contract Amount: ' + currency.symbol + total }
                </Typography>
                <Grid container className={ classes.title }>
                    <LongBox label1={ "Origin of product产地" } value1={ sellerAdd.country.id }
                             label2={ "Paymt Term付款条件" } value2={ termsOfPayment }/>
                    <LongBox label1={ "Packaging包装" } value1={ notes } label2={ "POL起运港" } value2={ pol }/>
                    <LongBox label1={ "TTerms条款" } value1={ termsOfPayment } label2={ "POD目的港" } value2={ pod }/>
                    <LongBox label1={ "Shipment Time装运期" } value1={ timeOfShipment } label2={ "Insurance保险" }
                             value2={ insurance }/>
                </Grid>
                <Grid item container xs={ 12 } direction="column" className={ classes.title }>
                    <Typography variant="caption">
                        Both Amount and Quantity 5% More or Less Allowed
                    </Typography>
                    <Typography variant="caption">
                        数量及总值允许有 5 %的增减
                    </Typography>
                    { bankDetails ? <Typography variant="caption">
                        { 'Seller Bank Details 卖家银行信息: ' + bankDetails }
                    </Typography> : '' }
                </Grid>
                <Grid item container xs={ 12 } direction="column">
                    <Typography variant="caption">
                        { customText }
                    </Typography>
                </Grid>
                <DocumentFooter label1={ "The Seller/卖方" } text1={ sellerAdd.name } label2={ "The Buyer/买方" }
                                text2={ consigneeAdd.name } variant={ "equal" }/>

            </Grid>
        </Grid>
    );
});

SalesContractPreview.propTypes = {
    document: PropTypes.object.isRequired
};

export default SalesContractPreview;