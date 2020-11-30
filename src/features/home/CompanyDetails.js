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
import { selectCompanyDetails } from './duck/dataSelectors.js';

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

    const companyDetails = useSelector(selectCompanyDetails);

    const data = useMemo(() => [
        { label: taxNumberLabel, value: companyDetails.taxNumber },
        { label: currencyLabel, value: companyDetails.currency },
        { label: industriesLabel, value: companyDetails.industries.join(', ') },
        { label: emailLabel, value: companyDetails.email },
        { label: phoneLabel, value: companyDetails.phone }
    ], [companyDetails]);

    return (
        <Container className={ classes.companyContainer }>
            <InfoCard
                className={ classes.topCard }
                title={ companyDetails.name }
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


