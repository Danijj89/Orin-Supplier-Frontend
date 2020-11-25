import React, { useMemo, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InfoCard from '../shared/wrappers/InfoCard.js';
import EditCompanyInfoButton from './EditCompanyInfoButton.js';
import CompanyAddressCards from './CompanyAddressCards.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import DividerDataDisplay from '../shared/wrappers/DividerDisplay.js';
import NavTabs from '../shared/components/NavTabs.js';
import Paper from '@material-ui/core/Paper';
import CompanyBankDetails from '../documents/CompanyBankDetails.js';
import { useSelector } from 'react-redux';
import { selectCompanyLegalAddress, selectCurrentCompany } from './duck/selectors.js';

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
    currencyLabel,
    industriesLabel,
    emailLabel,
    phoneLabel,
    tabsLabelsMap
} = LANGUAGE.home.companyDetails;

const CompanyDetails = React.memo(function CompanyDetails() {
    const classes = useStyles();
    const [tabValue, setTabValue] = useState('addresses');
    const company = useSelector(selectCurrentCompany);
    const legalAddress = useSelector(selectCompanyLegalAddress);

    const data = useMemo(() => [
        { label: taxNumberLabel, value: company.taxNumber },
        { label: currencyLabel, value: company.currency },
        { label: industriesLabel, value: company.industries },
        { label: emailLabel, value: legalAddress.email },
        { label: phoneLabel, value: legalAddress.phone }
    ], [company.taxNumber, company.currency, company.industries, legalAddress]);

    return (
        <Container className={ classes.companyContainer }>
            <InfoCard
                className={ classes.topCard }
                title={ legalAddress.name }
                button={ <EditCompanyInfoButton /> }
                content={
                    <Grid container>
                        <Grid container item xs={ 6 }>
                            <DividerDataDisplay data={ data }/>
                        </Grid>
                    </Grid>
                }
            />
            <Paper className={ classes.table }>
                <NavTabs
                    tabsLabelsMap={ tabsLabelsMap }
                    tabValue={ tabValue }
                    onChange={ setTabValue }
                />
                { tabValue === 'addresses' &&
                <CompanyAddressCards />
                }
                { tabValue === 'bankDetails' &&
                <CompanyBankDetails/>
                }
            </Paper>
        </Container>
    );
});

export default CompanyDetails;


