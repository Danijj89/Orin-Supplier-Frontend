import React from 'react';
import { LANGUAGE } from 'app/utils/constants.js';
import { useSelector } from 'react-redux';
import TextWithLabel from 'features/shared/components/TextWithLabel.js';
import ResetPasswordButton from 'features/home/ResetPasswordButton.js';
import InfoCard from 'features/shared/wrappers/InfoCard.js';
import EditAccountInfoButton from 'features/home/EditAccountInfoButton.js';
import { makeStyles } from '@material-ui/core/styles';
import { selectCurrentUser } from 'app/duck/selectors.js';
import { READ_OWN } from 'features/admin/utils/actions.js';
import UserPermission from 'features/shared/permissions/UserPermission.js';

const { titleLabel, nameLabel } = LANGUAGE.home.accountDetails;

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
        <UserPermission action={ READ_OWN } userId={ user._id }>
            <InfoCard
                title={ titleLabel }
                tools={ <EditAccountInfoButton user={ user }/> }
                content={
                    <>
                        <TextWithLabel label={ nameLabel } text={ user.name }/>
                        <ResetPasswordButton
                            className={ classes.resetPwdButton }
                            userId={ user._id }
                        />
                    </>
                }
            />
        </UserPermission>
    );
});

export default AccountDetails;
