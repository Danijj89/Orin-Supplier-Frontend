import React from 'react';
import { Container } from '@material-ui/core';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useSelector } from 'react-redux';
import TextWithLabel from '../shared/components/TextWithLabel.js';
import ResetPasswordButton from './ResetPasswordButton.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import EditAccountInfoButton from './EditAccountInfoButton.js';
import { makeStyles } from '@material-ui/core/styles';
import { selectCurrentUser } from '../../app/duck/selectors.js';
import Permission from '../shared/permissions/Permission.js';
import { USER } from '../admin/utils/resources.js';
import { READ_ANY, READ_OWN } from '../admin/utils/actions.js';

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
        <Permission resource={ USER } action={ [READ_ANY, READ_OWN] } isOwner={ true }>
            <InfoCard
                title={ titleLabel }
                button={ <EditAccountInfoButton user={ user }/> }
                content={
                    <Container>
                        <TextWithLabel label={ nameLabel } text={ user.name }/>
                        <TextWithLabel label={ emailLabel } text={ user.email }/>
                        <ResetPasswordButton
                            className={ classes.resetPwdButton }
                            userId={ user._id }
                        />
                    </Container>
                }
            />
        </Permission>
    );
});

export default AccountDetails;
