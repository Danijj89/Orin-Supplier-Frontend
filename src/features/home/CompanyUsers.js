import React, { useCallback } from 'react';
import { Add as IconAdd } from '@material-ui/icons';
import { LANGUAGE } from 'app/utils/constants.js';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import InfoCard from 'features/shared/wrappers/InfoCard.js';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers } from 'features/home/duck/users/selectors.js';
import { CREATE_ANY, DELETE_ANY, READ_ANY } from 'features/admin/utils/actions.js';
import UserPermission from 'features/shared/permissions/UserPermission.js';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { selectSessionUserId } from 'app/duck/selectors.js';
import { inactivateUser } from 'features/home/duck/users/thunks.js';

const useStyles = makeStyles((theme) => ({
    list: {
        minHeight: 500,
        padding: 0,
    },
    listItem: {
        padding: theme.spacing(2),
    },
}));

const { titleLabel, inviteButtonLabel, inactivateUserButtonLabel } = LANGUAGE.home.companyUsers;

const CompanyUsers = React.memo(function CompanyUsers() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);
    const sessionUserId = useSelector(selectSessionUserId);

    const isActiveAndNotSessionUser = useCallback(
        (user) => user.active && user._id !== sessionUserId, [sessionUserId]);

    const createInactivateHandler = useCallback(
        (userId) => () => dispatch(inactivateUser({ userId })), [dispatch]);

    return (
        <UserPermission action={ READ_ANY }>
            <InfoCard
                title={ titleLabel }
                tools={
                    <UserPermission action={ CREATE_ANY }>
                        <ThemedButton variant="text">
                            { inviteButtonLabel }
                            <IconAdd/>
                        </ThemedButton>
                    </UserPermission>
                }
                content={
                    <List className={ classes.list }>
                        { users.map((user) => (
                            <Box key={ `company-users-table-user-${ user._id }` }>
                                <ListItem
                                    className={ classes.listItem } disabled={ !user.active }>
                                    <ListItemText primary={ user.name }/>
                                    { isActiveAndNotSessionUser(user) &&
                                    <UserPermission action={ DELETE_ANY }>
                                        <ListItemSecondaryAction>
                                            <ThemedButton onClick={ createInactivateHandler(user._id) }>
                                                { inactivateUserButtonLabel }
                                            </ThemedButton>
                                        </ListItemSecondaryAction>
                                    </UserPermission>
                                    }
                                </ListItem>
                                <Divider/>
                            </Box>
                        )) }
                    </List>
                }
            />
        </UserPermission>
    );
});

export default CompanyUsers;
