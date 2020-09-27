import React from 'react';
import { LANGUAGE } from '../../constants.js';
import ButtonWithDialog from '../shared/components/ButtonWithDialog.js';
import { TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { resetPassword } from './duck/thunks.js';

const {
    buttonLabel,
    dialogTitle,
    confirmButtonLabel,
    passwordLabel,
    newPasswordLabel,
    confirmPasswordLabel
} = LANGUAGE.home.resetPasswordButton;

export default function ResetPasswordButton({ userId }) {
    const dispatch = useDispatch();
    const { register, errors, handleSubmit } = useForm({
        mode: 'onSubmit'
    });

    const onConfirm = (data) => {
        console.log(data);
        data.id = userId;
        dispatch(resetPassword(data));
    };

    return (
        <ButtonWithDialog
            buttonLabel={ buttonLabel }
            dialogTitle={ dialogTitle }
            onConfirm={ handleSubmit(onConfirm) }
            confirmButtonLabel={ confirmButtonLabel }
        >
            <>
                <TextField
                    label={ passwordLabel }
                    name="password"
                    type="password"
                    inputRef={ register({ required: true }) }
                    error={ !!errors.password }
                    fullWidth
                    autoFocus
                />
                <TextField
                    label={ newPasswordLabel }
                    name="newPassword"
                    type="password"
                    inputRef={ register({ required: true }) }
                    error={ !!errors.newPassword }
                    fullWidth
                />
                <TextField
                    label={ confirmPasswordLabel }
                    name="confirmPassword"
                    type="password"
                    inputRef={ register({ required: true }) }
                    error={ !!errors.confirmPassword }
                    fullWidth
                />
            </>
        </ButtonWithDialog>
    )
}