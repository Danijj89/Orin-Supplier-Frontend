import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import { useDispatch, useSelector } from 'react-redux';
import TextWithLabel from '../shared/displays/TextWithLabel.js';
import ResetPasswordButton from './ResetPasswordButton.js';
import { selectError, selectStatus } from './duck/selectors.js';
import ErrorMessage from '../shared/displays/ErrorMessage.js';
import { cleanError } from './duck/slice.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import EditAccountInfoButton from './EditAccountInfoButton.js';

const {
    titleLabel,
    nameLabel,
    emailLabel
} = LANGUAGE.home.accountDetails;

export default function AccountDetails({ user }) {
    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);

    useEffect(() => {
        if (status === 'REJECTED') {
            return () => dispatch(cleanError());
        }
    }, [dispatch, status]);

    return (
        <InfoCard
            title={ titleLabel }
            button={ <EditAccountInfoButton user={user}/> }
            content={
                <Container>
                    { status === 'REJECTED' && <ErrorMessage errors={ [error] }/> }
                    <TextWithLabel label={ nameLabel } text={ user.name }/>
                    <TextWithLabel label={ emailLabel } text={ user.email }/>
                    <ResetPasswordButton userId={ user._id }/>
                </Container>
            }
        />
    )
}