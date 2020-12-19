import React from 'react';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useSelector } from 'react-redux';
import TextWithLabel from '../shared/components/TextWithLabel.js';
import ResetPasswordButton from './ResetPasswordButton.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import EditAccountInfoButton from './EditAccountInfoButton.js';
import { makeStyles } from '@material-ui/core/styles';
import { selectCurrentUser } from '../../app/duck/selectors.js';
import { USER } from '../admin/utils/resources.js';
import { READ_OWN, UPDATE_OWN } from '../admin/utils/actions.js';
import UserPermission from '../shared/permissions/UserPermission.js';

const { titleLabel, nameLabel, emailLabel } = LANGUAGE.home.accountDetails;

const useStyles = makeStyles((theme) => ({
    resetPwdButton: {
        margin: theme.spacing(2),
        marginTop: theme.spacing(5),
    },
    container: {
        padding: theme.spacing(1),
    },
}));

const AccountDetails = React.memo(function AccountDetails() {
    const classes = useStyles();
    const user = useSelector(selectCurrentUser);

    return (
        <UserPermission resource={ USER } action={ READ_OWN } userId={ user._id }>
            <InfoCard
                title={ titleLabel }
                button={ <EditAccountInfoButton user={ user }/> }
                content={
                    <>
                        <TextWithLabel label={ nameLabel } text={ user.name }/>
                        <TextWithLabel label={ emailLabel } text={ user.email }/>
                        <UserPermission resource={ USER } action={ UPDATE_OWN } userId={ user._id }>
                            <ResetPasswordButton
                                className={ classes.resetPwdButton }
                                userId={ user._id }
                            />
                        </UserPermission>
                    </>
                }
            />
        </UserPermission>
    );
});

export default AccountDetails;
