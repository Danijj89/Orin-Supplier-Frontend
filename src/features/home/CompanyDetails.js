import React, { useEffect } from 'react';
import { Typography, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectStatus } from './duck/selectors.js';
import { makeStyles } from '@material-ui/core/styles';
import ErrorMessage from '../shared/displays/ErrorMessage.js';
import { cleanError } from './duck/slice.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import EditCompanyInfoButton from './EditCompanyInfoButton.js';
import CompanyAddressTable from './CompanyAddressTable.js';

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

    return (
        <Container className={classes.companyContainer}>
            {status === 'REJECTED' && <ErrorMessage errors={[error]} />}
            <InfoCard
                className={classes.topCard}
                title={company.defaultAddress.name}
                button={<EditCompanyInfoButton company={company} />}
                content={<Typography>{company.defaultAddress.name}</Typography>}
            />
            <CompanyAddressTable className={classes.table} company={company} />
        </Container>
    );
}
