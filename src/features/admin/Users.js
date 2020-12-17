import React, { useCallback, useMemo, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllCompanies } from './duck/companies/selectors.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import Table from '../shared/components/table/Table.js';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SideTextField from '../shared/inputs/SideTextField.js';
import NewUserButton from './NewUserButton.js';
import AdminUserDialog from './AdminUserDialog.js';
import { updateUserRoles } from './duck/companies/thunks.js';

const {
    companyLabel,
    dialogTitleLabel,
    dialogSubmitLabel,
    tableHeaderLabels
} = LANGUAGE.admin.admin.users;

const Users = React.memo(function Users() {
    const dispatch = useDispatch();
    const companies = useSelector(selectAllCompanies);
    const [company, setCompany] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [user, setUser] = useState(null);

    const getCompanyLegalName = useCallback((option) =>
            option.addresses.find(address => address.legal).name,
        []);

    const onRowClick = (params) => {
        setUser(params.user);
        setIsEdit(true);
    };
    const onEditCancel = () => {
        setUser(null);
        setIsEdit(false);
    };
    const onEditSubmit = (data) => {
        const { _id: userId, company: companyId, ...update } = data;
        dispatch(updateUserRoles({ companyId, userId, update }));
        setIsEdit(false);
    };

    const columns = useMemo(() => [
        { field: 'name', headerName: tableHeaderLabels.name },
        { field: 'email', headerName: tableHeaderLabels.email },
        { field: 'roles', headerName: tableHeaderLabels.roles }
    ], []);

    const rows = useMemo(() => {
        if (!company) return [];
        return company.users.map(user => ({
            user: user,
            name: user.name,
            email: user.email,
            roles: user.roles.join(', ')
        }));
    }, [company]);

    return (
        <Paper>
            <NewUserButton/>
            <Autocomplete
                renderInput={ (params) =>
                    <SideTextField
                        { ...params }
                        label={ companyLabel }
                    />
                }
                options={ companies }
                getOptionLabel={ getCompanyLegalName }
                getOptionSelected={ (option, value) => option._id === value._id }
                value={ company }
                onChange={ (_, newValue) => setCompany(newValue) }
            />
            <Table
                rows={ rows }
                columns={ columns }
                onRowClick={ onRowClick }
            />
            { user &&
            <AdminUserDialog
                onCancel={ onEditCancel }
                onSubmit={ onEditSubmit }
                isOpen={ isEdit }
                titleLabel={ dialogTitleLabel }
                submitLabel={ dialogSubmitLabel }
                user={ user }
            /> }
        </Paper>
    );
});

export default Users;