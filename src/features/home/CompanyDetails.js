import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectStatus } from '../../app/duck/selectors.js';
import { makeStyles } from '@material-ui/core/styles';
import ErrorMessage from '../shared/displays/ErrorMessage.js';
import { cleanError } from '../../app/duck/slice.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import EditCompanyInfoButton from './EditCompanyInfoButton.js';
import CompanyAddressTable from './CompanyAddressTable.js';
import { LANGUAGE } from '../../constants.js';
import ColumnInfoDisplay from '../shared/wrappers/ColumnInfoDisplay.js';

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
    phoneLabel
} = LANGUAGE.home.companyDetails;

export default function CompanyDetails({ company }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);

    useEffect(() => {
        if (status === 'REJECTED') {
            return () => dispatch(cleanError());
        }
    }, [dispatch, status]);

    const leftLabels = [taxNumberLabel, defaultCurrencyLabel, industriesLabel];
    const leftData = [company?.taxNumber, company?.defaultCurrency, company?.industries];
    const rightLabels = [emailLabel, phoneLabel];
    const rightData = [company?.legalAddress?.email, company?.legalAddress?.phone];


    return (
        <Container className={ classes.companyContainer }>
            { status === 'REJECTED' && <ErrorMessage errors={ [error] }/> }
            <InfoCard
                className={ classes.topCard }
                title={ company.defaultAddress.name }
                button={ <EditCompanyInfoButton company={ company }/> }
                content={
                    <ColumnInfoDisplay
                        leftLabels={ leftLabels }
                        leftData={ leftData }
                        rightLabels={ rightLabels }
                        rightData={ rightData }
                    />
                }
            />
            <CompanyAddressTable className={ classes.table } company={ company }/>
        </Container>
    );
}
