import React, { useCallback, useState } from 'react';
import { LANGUAGE } from 'app/utils/constants.js';
import InfoCard from 'features/shared/wrappers/InfoCard.js';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers } from 'features/home/duck/users/selectors.js';
import { CREATE_ANY, CREATE_OWN, READ_ANY } from 'features/admin/utils/actions.js';
import UserPermission from 'features/shared/permissions/UserPermission.js';
import { selectSessionUserId } from 'app/duck/selectors.js';
import { updateUser, updateUserStatus } from 'features/home/duck/users/thunks.js';
import NewUserButton from 'features/home/NewUserButton.js';
import CompanyUser from 'features/home/CompanyUser.js';
import CompanyUserDialog from 'features/home/CompanyUserDialog.js';
import Users from 'features/admin/Users.js';

const useStyles = makeStyles(() => ({
    list: {
        minHeight: 400,
        maxHeight: '90wh',
        padding: 0,
        overflow: 'auto'
    }
}));

const {
    titles,
    buttons
} = LANGUAGE.home.companyUsers;

const CompanyUsers = React.memo(function CompanyUsers() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);
    const sessionUserId = useSelector(selectSessionUserId);
    const [user, setUser] = useState(null);

    const createUserClickHandler = useCallback(user => () => setUser(user), []);
    const onDialogClose = useCallback(() => setUser(null), []);

    const onUpdateUser = useCallback(data => {
        dispatch(updateUser({ userId: user._id, update: data }));
        setUser(null);
    }, [user, dispatch]);

    const createChangeUserStatusHandler = useCallback(
        (userId, active) => () =>
            dispatch(updateUserStatus({ userId, update: { active: !active } })),
        [dispatch]);

    return (
        <UserPermission action={ READ_ANY }>
            <InfoCard
                title={ titles.companyUsers }
                tools={
                    <UserPermission action={ [CREATE_ANY, CREATE_OWN] }>
                        <NewUserButton/>
                    </UserPermission>
                }
                content={
                    <List className={ classes.list }>
                        { users.map((user) =>
                            <CompanyUser
                                key={ `company-users-table-user-${ user._id }` }
                                isCurrentUser={ user._id === sessionUserId }
                                onUserStatusChange={ createChangeUserStatusHandler(user._id, user.active) }
                                onUserClick={ createUserClickHandler(user) }
                                user={ user }
                            />
                        ) }
                    </List>
                }
            />
            { user &&
            <UserPermission action={ [CREATE_ANY, CREATE_OWN] }>
                <CompanyUserDialog
                    onSubmit={ onUpdateUser }
                    onCancel={ onDialogClose }
                    isOpen={ Boolean(user) }
                    titleLabel={ titles.updateUser }
                    submitLabel={ buttons.updateSubmit }
                    user={ user }
                />
            </UserPermission> }
        </UserPermission>
    );
});

export default CompanyUsers;
