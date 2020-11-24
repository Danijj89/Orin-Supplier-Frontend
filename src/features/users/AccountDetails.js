import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import TextWithLabel from '../shared/components/TextWithLabel.js';
import ResetPasswordButton from './ResetPasswordButton.js';
import { selectAppError, selectAppStatus } from '../../app/duck/selectors.js';
import ErrorMessages from '../shared/components/ErrorMessages.js';
import { cleanError } from '../../app/duck/slice.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import EditAccountInfoButton from './EditAccountInfoButton.js';
import { makeStyles } from '@material-ui/core/styles';

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

export default function AccountDetails({ user }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const status = useSelector(selectAppStatus);
    const error = useSelector(selectAppError);

    useEffect(() => {
        if (status === 'REJECTED') {
            return () => dispatch(cleanError());
        }
    }, [dispatch, status]);

    return (
        <InfoCard
            title={titleLabel}
            button={<EditAccountInfoButton user={user} />}
            content={
                <Container>
                    {status === 'REJECTED' && <ErrorMessages errors={[error]} />}
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
