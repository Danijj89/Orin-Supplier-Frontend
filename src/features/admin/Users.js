import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import { selectAllCompanies } from './duck/companies/selectors.js';
import { useForm } from 'react-hook-form';
import { LANGUAGE } from '../../app/utils/constants.js';
import Table from '../shared/components/table/Table.js';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SideTextField from '../shared/inputs/SideTextField.js';
import FormDialog from '../shared/wrappers/FormDialog.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles.js';
import { selectAllRoleIds } from './duck/roles/selectors.js';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 320,
        height: 230,
        overflow: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
}));

const {
    companyLabel,
    dialogTitleLabel,
    dialogSubmitLabel,
    tableHeaderLabels
} = LANGUAGE.admin.admin.users;

const Users = React.memo(function Users() {
    const classes = useStyles();
    const companies = useSelector(selectAllCompanies);
    const roleIds = useSelector(selectAllRoleIds);
    const [company, setCompany] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [user, setUser] = useState(null);

    const { register, watch, getValues, setValue, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            roles: []
        }
    });

    useEffect(() => {
        register({ name: 'roles' }, { validate: roles => roles.length > 0 });
    }, [register]);

    const roles = watch('roles');

    const getCompanyLegalName = useCallback((option) =>
            option.addresses.find(address => address.legal).name,
        []);

    const onRowClick = (params) => {
        setUser(params.user);
        setValue('roles', params.user.roles);
        setIsEdit(true);
    };
    const onEditCancel = () => {
        setUser(null);
        setIsEdit(false);
    };
    const onEditSubmit = (data) => {
        console.log(data)
    };

    const onSelect = useCallback(
        (role) => () => {
            const currentIdx = getValues('roles').indexOf(role);
            const newRoles = [...getValues('roles')];
            if (currentIdx === -1) newRoles.push(role);
            else newRoles.splice(currentIdx, 1);
            setValue('roles', newRoles);
        }, [getValues, setValue]);

    const columns = useMemo(() => [
        { field: 'user', hide: true },
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
            <FormDialog
                isOpen={ isEdit }
                titleLabel={ dialogTitleLabel }
                submitLabel={ dialogSubmitLabel }
                onCancel={ onEditCancel }
                onSubmit={ handleSubmit(onEditSubmit) }
            >
                <Paper className={ classes.paper }>
                    <List dense component="div" role="list">
                        { roleIds.map((role) =>
                            <ListItem key={ role } role="listitem" button onClick={ onSelect(role) }>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={ roles.indexOf(role) !== -1 }
                                        tabIndex={ -1 }
                                        disableRipple
                                        color="primary"
                                    />
                                </ListItemIcon>
                                <ListItemText primary={ role }/>
                            </ListItem>
                        ) }
                    </List>
                </Paper>
            </FormDialog>
            }
        </Paper>
    );
});

export default Users;