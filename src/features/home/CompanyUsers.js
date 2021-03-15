import React, {useCallback} from 'react';
import {LANGUAGE} from 'app/utils/constants.js';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import InfoCard from 'features/shared/wrappers/InfoCard.js';
import {makeStyles} from '@material-ui/core/styles';
import {List, ListItem} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {selectAllUsers} from 'features/home/duck/users/selectors.js';
import {CREATE_ANY, DELETE_ANY, READ_ANY} from 'features/admin/utils/actions.js';
import UserPermission from 'features/shared/permissions/UserPermission.js';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import {selectSessionUserId} from 'app/duck/selectors.js';
import {updateUserStatus} from 'features/home/duck/users/thunks.js';
import NewUserButton from 'features/home/NewUserButton.js';
import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({
    list: {
        minHeight: 500,
        maxHeight: '90wh',
        padding: 0,
        overflow: 'auto'
    },
    listItem: {
        padding: theme.spacing(2),
    },
    button: {
        minWidth: 120,
        marginLeft: theme.spacing(2),
        height: theme.spacing(3.5)
    },
    buttonDanger: {
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

const {titleLabel, inactivateUserButtonLabel, activateUserButtonLabel} = LANGUAGE.home.companyUsers;

const CompanyUsers = React.memo(function CompanyUsers() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);

    const sessionUserId = useSelector(selectSessionUserId);

    const isNotUserSession = useCallback(
        (user) => user._id !== sessionUserId, [sessionUserId]);

    const createChangeUserStatusHandler = useCallback(
        (userId, active) => () =>
            dispatch(updateUserStatus({userId, update: {active: !active}})),
        [dispatch]);

    return (
        <UserPermission action={READ_ANY}>
            <InfoCard
                title={titleLabel}
                tools={
                    <UserPermission action={CREATE_ANY}>
                        <NewUserButton/>
                    </UserPermission>
                }
                content={
                    <List className={classes.list}>
                        {users.map((user) => (
                            <Box key={`company-users-table-user-${user._id}`}>
                                <ListItem className={classes.listItem}>
                                    <ListItemText
                                        primary={user.name}
                                        className={clsx(!user.active && classes.disabled)}
                                    />
                                    {isNotUserSession(user) &&
                                    <UserPermission action={DELETE_ANY}>
                                        <ListItemSecondaryAction>
                                            <ThemedButton
                                                onClick={createChangeUserStatusHandler(user._id, user.active)}
                                                className={classes.buttonDanger}
                                                variant={"outlined"}
                                            >
                                                {user.active
                                                    ? inactivateUserButtonLabel
                                                    : activateUserButtonLabel
                                                }
                                            </ThemedButton>
                                        </ListItemSecondaryAction>
                                    </UserPermission>
                                    }
                                </ListItem>
                                <Divider/>
                            </Box>
                        ))}
                    </List>

                }
            />
        </UserPermission>
    );
});

export default CompanyUsers;
