import React, { useMemo } from 'react';
import Table from '../shared/components/table/Table.js';
import { LANGUAGE, LOCALE } from '../../app/utils/constants.js';
import { useSelector } from 'react-redux';
import { selectAllCompanies } from './duck/companies/selectors.js';
import { getOptionLabel } from '../../app/utils/options/getters.js';
import { getCompanyLegalAddress } from '../../app/utils/models/getters.js';
import Paper from '@material-ui/core/Paper';
import NewCompanyButton from './NewCompanyButton.js';

const {
    tableHeaderLabels
} = LANGUAGE.admin.admin.companies;

const Companies = React.memo(function Companies() {
    const companies = useSelector(selectAllCompanies);

    const columns = useMemo(() => [
        { field: 'name', headerName: tableHeaderLabels.name },
        { field: 'industries', headerName: tableHeaderLabels.industries },
        { field: 'city', headerName: tableHeaderLabels.city }
    ], []);

    const rows = useMemo(() => companies.map(company => {
        const legalAddress = getCompanyLegalAddress(company);
        return {
            name: legalAddress.name,
            industries: company.industries.map(
                industry => getOptionLabel(industry, LOCALE)).join(','),
            city: legalAddress.city
        };
    }), [companies]);

    return (
        <Paper>
            <NewCompanyButton />
            <Table rows={ rows } columns={ columns }/>
        </Paper>
    );
});

export default Companies;