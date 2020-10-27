import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppError, selectStatus } from '../../app/duck/selectors.js';
import { makeStyles } from '@material-ui/core/styles';
import ErrorDisplay from '../shared/components/ErrorDisplay.js';
import { cleanError } from '../../app/duck/slice.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import EditCompanyInfoButton from './EditCompanyInfoButton.js';
import CompanyAddressCards from './CompanyAddressCards.js';
import { LANGUAGE } from '../../app/constants.js';
import ColumnInfoDisplay from '../shared/wrappers/ColumnInfoDisplay.js';
import { selectHomeError } from './duck/selectors.js';

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
    const homeError = useSelector(selectHomeError);

    useEffect(() => {
        if (status === 'REJECTED') {
            return () => dispatch(cleanError());
        }
    }, [dispatch, status]);

    const leftData = [
        { label: taxNumberLabel, value: company?.taxNumber },
        { label: defaultCurrencyLabel, value: company?.defaultCurrency },
        { label: industriesLabel, value: company?.industries },
        { label: emailLabel, value: company?.legalAddress?.email },
        { label: phoneLabel, value: company?.legalAddress?.phone }
    ];

    return (
        <Container className={ classes.companyContainer }>
            { homeError && <ErrorDisplay errors={ [homeError] }/> }
            <InfoCard
                className={ classes.topCard }
                title={ company?.defaultAddress?.name }
                button={ <EditCompanyInfoButton company={ company }/> }
                content={
                    <ColumnInfoDisplay
                        leftData={ leftData }
                    />
                }
            />
            <CompanyAddressCards className={ classes.table } company={ company }/>
        </Container>
    );
}
