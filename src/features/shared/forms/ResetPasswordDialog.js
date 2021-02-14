import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormDialog from '../wrappers/FormDialog.js';
import { LANGUAGE } from 'app/utils/constants.js';
import PropTypes from 'prop-types';
import SideTextField from '../inputs/SideTextField.js';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import { makeStyles } from '@material-ui/core/styles';
import ErrorSnackbar from 'features/shared/components/ErrorSnackbar.js';
import { useDispatch } from 'react-redux';
import { sendResetCode } from 'features/home/duck/users/thunks.js';

const useStyles = makeStyles(theme => ({
    sendCodeButton: {
        fontSize: 12,
        marginRight: theme.spacing(2)
    }
}));

const {
    formLabels,
    buttons,
    errorMessages
} = LANGUAGE.shared.forms.resetPasswordDialog;

const ResetPassWordDialog = React.memo(function ResetPassWordDialog(
    { userId, isOpen, titleLabel, submitLabel, onSubmit, onCancel, className }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [errMessages, setErrMessages] = useState([]);

    const { register, errors, handleSubmit, getValues } = useForm({
        mode: 'onSubmit'
    });

    useEffect(() => {
        setErrMessages(Object.values(errors)
            .filter(err => err.message)
            .map(err => err.message)
        );
    }, [errors])

    const onResetCode = useCallback(() =>
        dispatch(sendResetCode({ userId })),
        [dispatch, userId]);

    return (
        <>
            <ErrorSnackbar error={ errMessages }/>
            <FormDialog
                className={ className }
                isOpen={ isOpen }
                titleLabel={ titleLabel }
                submitLabel={ submitLabel }
                onCancel={ onCancel }
                onSubmit={ handleSubmit(onSubmit) }
            >
                <SideTextField
                    label={ formLabels.newPassword }
                    name="newPassword"
                    type="password"
                    inputRef={ register({ required: true }) }
                    error={ !!errors.newPassword }
                    required
                />
                <SideTextField
                    label={ formLabels.confirmNewPassword }
                    name="confirmPassword"
                    type="password"
                    inputRef={ register({
                        validate: pass => getValues('newPassword') === pass
                            || errorMessages.confirmPasswordMismatch
                    }) }
                    error={ !!errors.confirmPassword }
                    required
                />
                <ThemedButton
                    className={ classes.sendCodeButton }
                    variant="text"
                    onClick={ onResetCode }
                >
                    { buttons.resetCode }
                </ThemedButton>
                <SideTextField
                    label={ formLabels.code }
                    name="code"
                    inputRef={ register({ required: true }) }
                    error={ !!errors.code }
                    required
                />
            </FormDialog>
        </>
    )
});

ResetPassWordDialog.propTypes = {
    userId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    titleLabel: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default ResetPassWordDialog;