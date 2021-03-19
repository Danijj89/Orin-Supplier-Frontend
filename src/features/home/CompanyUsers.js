import React, { useCallback, useState } from 'react';
import { LANGUAGE } from 'app/utils/constants.js';
import InfoCard from 'features/shared/wrappers/InfoCard.js';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers } from 'features/home/duck/users/selectors.js';
import { CREATE_ANY, READ_ANY } from 'features/admin/utils/actions.js';
import UserPermission from 'features/shared/permissions/UserPermission.js';
import { selectSessionUserId } from 'app/duck/selectors.js';
import { updateUserStatus } from 'features/home/duck/users/thunks.js';
import NewUserButton from 'features/home/NewUserButton.js';
import CompanyUser from 'features/home/CompanyUser.js';

const useStyles = makeStyles(() => ({
    list: {
        minHeight: 400,
        maxHeight: '90wh',
        padding: 0,
        overflow: 'auto'
    }
}));

const {
    titleLabel
} = LANGUAGE.home.companyUsers;

const CompanyUsers = React.memo(function CompanyUsers() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);
    const sessionUserId = useSelector(selectSessionUserId);
    const [user, setUser] = useState(null);

    const createUserClickHandler = useCallback(user => setUser(user), []);

    const createChangeUserStatusHandler = useCallback(
        (userId, active) => () =>
            dispatch(updateUserStatus({ userId, update: { active: !active } })),
        [dispatch]);

    return (
        <UserPermission action={ READ_ANY }>
            <InfoCard
                title={ titleLabel }
                tools={
                    <UserPermission action={ CREATE_ANY }>
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
        </UserPermission>
    );
});

export default CompanyUsers;
