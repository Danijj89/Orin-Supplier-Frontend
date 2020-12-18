import React, { useCallback, useMemo, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NewRoleButton from './NewRoleButton.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllRoles } from './duck/roles/selectors.js';
import Table from '../shared/components/table/Table.js';
import FormDialog from '../shared/wrappers/FormDialog.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles.js';
import { selectAllPermissionsIds } from './duck/permissions/selectors.js';
import { updateRole } from './duck/roles/thunks.js';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 320,
        height: 600,
        overflow: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
}));

const {
    dialogTitleLabel,
    dialogSubmitLabel,
    tableHeaderLabels
} = LANGUAGE.admin.admin.roles;

const Roles = React.memo(function Roles() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const roles = useSelector(selectAllRoles);
    const permissionIds = useSelector(selectAllPermissionsIds);
    const [isEdit, setIsEdit] = useState(false);
    const [role, setRole] = useState(null);
    const [permissions, setPermissions] = useState([]);

    const onRowClick = useCallback(
        (params) => {
            setRole(params.role);
            setPermissions(params.role.permissions);
            setIsEdit(true);
        }, []);

    const onEditCancel = useCallback(() => {
        setRole(null);
        setIsEdit(false);
    }, []);

    const onEditSubmit = useCallback(() => {
        if (permissions.length > 0) {
            const update = {
                permissions
            };
            dispatch(updateRole({ roleId: role._id, update }));
            setRole(null);
            setIsEdit(false);
        }
    }, [dispatch, permissions, role]);

    const onSelect = useCallback(
        (permission) => () => {
            setPermissions(prevPermissions => {
                const currentIdx = prevPermissions.indexOf(permission);
                const newPermissions = [...prevPermissions];
                if (currentIdx === -1) newPermissions.push(permission);
                else newPermissions.splice(currentIdx, 1);
                return newPermissions;
            });
        }, []);

    const columns = useMemo(() => [
        { field: '_id', headerName: tableHeaderLabels._id },
    ], []);

    const rows = useMemo(() =>
        roles.map(role => ({
            role: role,
            _id: role._id
        })), [roles]);

    return (
        <Paper>
            <Grid container>
                <Grid item xs={ 12 }>
                    <NewRoleButton/>
                </Grid>
                <Grid item xs={ 12 }>
                    <Table
                        rows={ rows }
                        columns={ columns }
                        onRowClick={ onRowClick }
                    />
                </Grid>
                { role &&
                <FormDialog
                    isOpen={ isEdit }
                    titleLabel={ dialogTitleLabel }
                    submitLabel={ dialogSubmitLabel }
                    onCancel={ onEditCancel }
                    onSubmit={ onEditSubmit }
                >
                    <Paper className={ classes.paper }>
                        <List dense component="div" role="list">
                            { permissionIds.map((permission) =>
                                <ListItem key={ permission } role="listitem" button
                                          onClick={ onSelect(permission) }>
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={ permissions.indexOf(permission) !== -1 }
                                            tabIndex={ -1 }
                                            disableRipple
                                            color="primary"
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={ permission }/>
                                </ListItem>
                            ) }
                        </List>
                    </Paper>
                </FormDialog>
                }
            </Grid>
        </Paper>
    );
});

export default Roles;