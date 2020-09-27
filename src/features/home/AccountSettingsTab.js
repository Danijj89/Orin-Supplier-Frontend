import React, { useEffect, useState } from 'react';
import { Container, TextField } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentUser } from './duck/thunks.js';
import EditableCard from '../shared/components/EditableCard.js';
import TextWithLabel from '../shared/displays/TextWithLabel.js';
import ResetPasswordButton from './ResetPasswordButton.js';
import { selectCurrentUser, selectError, selectStatus } from './duck/selectors.js';
import ErrorMessage from '../shared/displays/ErrorMessage.js';
import { cleanError } from './duck/slice.js';

const { titleLabel, nameLabel, emailLabel } = LANGUAGE.home.accountSettingsTab;

export default function AccountSettingsTab() {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const [isEdit, setIsEdit] = useState(false);

    const { register, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            name: user.name,
            email: user.email
        },
        shouldUnregister: false
    });

    const onEdit = () => setIsEdit(true);
    const onCancel = () => setIsEdit(false);

    const onSave = (data) => {
        data.id = user._id;
        dispatch(updateCurrentUser(data));
        setIsEdit(false);
    }

    useEffect(() => {
        return () => dispatch(cleanError());
    }, [dispatch]);

    return (
        <EditableCard
            title={ titleLabel }
            isEdit={ isEdit }
            onEdit={ onEdit }
            onCancel={ onCancel }
            onConfirm={handleSubmit(onSave)}
        >
            { !isEdit &&
            <Container>
                {status === 'REJECTED' && <ErrorMessage errors={[error]} />}
                <TextWithLabel label={nameLabel} text={user.name}/>
                <TextWithLabel label={emailLabel} text={user.email}/>
                <ResetPasswordButton userId={user._id}/>
            </Container> }
            { isEdit &&
            <Container>
                <TextField
                    label={nameLabel}
                    name="name"
                    inputRef={ register({ required: true})}
                    error={ !!errors.name}
                    autoFocus
                />
                <TextField
                    label={emailLabel}
                    name="email"
                    inputRef={ register({ required: true})}
                    error={ !!errors.email}
                />
            </Container> }
        </EditableCard>
    )
}