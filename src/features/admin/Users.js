import React, { useCallback, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { useSelector } from 'react-redux';
import { selectAllCompanies } from './duck/companies/selectors.js';
import { useForm } from 'react-hook-form';
import { LANGUAGE } from '../../app/utils/constants.js';
import Table from '../shared/components/table/Table.js';

const {
    companyLabel,
    tableHeaderLabels
} = LANGUAGE.admin.admin.users;

const Users = React.memo(function Users() {
    const companies = useSelector(selectAllCompanies);

    const { control, watch } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            company: null,
            permissions: []
        }
    });

    const company = watch('company');

    const getCompanyLegalName = useCallback((option) =>
            option.addresses.find(address => address.legal).name,
        []);

    const columns = useMemo(() => [
        { field: '_id', hide: true },
        { field: 'name', headerName: tableHeaderLabels.name },
        { field: 'email', headerName: tableHeaderLabels.email },
        { field: 'roles', headerName: tableHeaderLabels.roles }
    ], []);

    const rows = useMemo(() => {
        if (!company) return [];
        return company.users.map(user => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            roles: user.roles.join(', ')
        }));
    }, [company]);

    return (
        <Paper>
            <RHFAutoComplete
                rhfControl={ control }
                name="company"
                label={ companyLabel }
                options={ companies }
                getOptionLabel={ getCompanyLegalName }
                getOptionSelected={ (option, value) => option._id === value._id }
            />
            <Table rows={rows} columns={columns} />
        </Paper>
    );
});

export default Users;