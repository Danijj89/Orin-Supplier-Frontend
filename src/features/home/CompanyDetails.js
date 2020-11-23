import React, { useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InfoCard from '../shared/wrappers/InfoCard.js';
import EditCompanyInfoButton from './EditCompanyInfoButton.js';
import CompanyAddressCards from './CompanyAddressCards.js';
import { LANGUAGE } from '../../app/constants.js';
import DividerDataDisplay from '../shared/wrappers/DividerDisplay.js';
import NavTabs from '../shared/components/NavTabs.js';
import Paper from '@material-ui/core/Paper';
import CompanyBankDetails from '../documents/CompanyBankDetails.js';

const useStyles = makeStyles((theme) => ({
    topCard: {
        margin: '0',
    },
    table: {
        marginTop: theme.spacing(3),
    },
    companyContainer: {
        padding: '0',
    },
}));

const {
    taxNumberLabel,
    defaultCurrencyLabel,
    industriesLabel,
    emailLabel,
    phoneLabel,
    tabsLabelsMap
} = LANGUAGE.home.companyDetails;

export default function CompanyDetails({ company }) {
    const classes = useStyles();
    const [tabValue, setTabValue] = useState('bankDetails');

    const data = [
        { label: taxNumberLabel, value: company?.taxNumber },
        { label: defaultCurrencyLabel, value: company?.defaultCurrency },
        { label: industriesLabel, value: company?.industries },
        { label: emailLabel, value: company?.legalAddress?.email },
        { label: phoneLabel, value: company?.legalAddress?.phone }
    ];

    return (
        <Container className={ classes.companyContainer }>
            <InfoCard
                className={ classes.topCard }
                title={ company?.defaultAddress?.name }
                button={ <EditCompanyInfoButton company={ company }/> }
                content={
                    <Grid container>
                        <Grid container item xs={ 12 }>
                            <DividerDataDisplay data={ data }/>
                        </Grid>
                    </Grid>
                }
            />
            <Paper>
                <NavTabs
                    tabsLabelsMap={ tabsLabelsMap }
                    tabValue={ tabValue }
                    onChange={ setTabValue }
                />
                { tabValue === 'addresses' &&
                <CompanyAddressCards className={ classes.table } company={ company }/>
                }
                { tabValue === 'bankDetails' &&
                <CompanyBankDetails/>
                }
            </Paper>
        </Container>
    );
}
