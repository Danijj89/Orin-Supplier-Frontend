import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import UserPermission from 'features/shared/permissions/UserPermission.js';
import { DELETE_ANY } from 'features/admin/utils/actions.js';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { getOptionLabel } from 'app/utils/options/getters.js';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { selectRolesMap } from 'features/admin/duck/roles/selectors.js';

const useStyles = makeStyles((theme) => ({
    listItem: {
        height: 70,
        padding: theme.spacing(2),
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.grey.light
    },
    button: {
        minWidth: 120,
        marginLeft: theme.spacing(2),
        height: theme.spacing(3.5),
        color: theme.palette.danger.main,
        borderColor: theme.palette.danger.main,
    },
    disabled: {
        color: theme.palette.grey.main
    }
}));

const {
    buttons
} = LANGUAGE.home.companyUsers;

const CompanyUser = React.memo(function CompanyUser(
    { isCurrentUser, user, onUserStatusChange, onUserClick }) {
    const classes = useStyles();
    const rolesMap = useSelector(selectRolesMap);
    const secondaryText = useMemo(() => {
        let result = [];
        if (user.email) result.push(user.email);
        result.push(user.roles.reduce((arr, role) => {
            arr.push(getOptionLabel(rolesMap[role].name));
            return arr;
        }, []).join(' - '));
        return result.join(' | ');
    }, [user.email, user.roles, rolesMap]);

    return (
        <ListItem className={ classes.listItem } onClick={ onUserClick }>
            <ListItemText
                primary={ user.name }
                secondary={ secondaryText }
                className={ clsx(!user.active && classes.disabled) }
            />
            { !isCurrentUser &&
            <UserPermission action={ DELETE_ANY }>
                <ListItemSecondaryAction>
                    <ThemedButton
                        onClick={ onUserStatusChange }
                        className={ classes.button }
                        variant={ "outlined" }
                    >
                        { user.active
                            ? buttons.inactivate
                            : buttons.reactivate
                        }
                    </ThemedButton>
                </ListItemSecondaryAction>
            </UserPermission>
            }
        </ListItem>
    );
});

CompanyUser.propTypes = {
    isCurrentUser: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    onUserStatusChange: PropTypes.func.isRequired
};

export default CompanyUser;