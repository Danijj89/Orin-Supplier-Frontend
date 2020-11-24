import React from 'react';
import { Container } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import { useSelector } from 'react-redux';
import TextWithLabel from '../shared/components/TextWithLabel.js';
import ResetPasswordButton from './ResetPasswordButton.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import EditAccountInfoButton from './EditAccountInfoButton.js';
import { makeStyles } from '@material-ui/core/styles';
import { selectUserById } from './duck/selectors.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';

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

export default function AccountDetails() {
    const classes = useStyles();
    const userId = useSelector(selectCurrentUserId);
    const user = useSelector(state => selectUserById(state, userId));

    return (
        <InfoCard
            title={titleLabel}
            button={<EditAccountInfoButton user={user} />}
            content={
                <Container>
                    <TextWithLabel label={nameLabel} text={user.name} />
                    <TextWithLabel label={emailLabel} text={user.email} />
                    <ResetPasswordButton
                        className={classes.resetPwdButton}
                        userId={user._id}
                    />
                </Container>
            }
        />
    );
}
