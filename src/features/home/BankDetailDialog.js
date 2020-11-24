import React from 'react';
import FormDialog from '../shared/wrappers/FormDialog.js';
import { useForm } from 'react-hook-form';
import { LANGUAGE } from '../../app/constants.js';
import SideTextField from '../shared/inputs/SideTextField.js';

const {
    deleteMessage,
    detailLabel
} = LANGUAGE.home.companyDetails.bankDetailDialog;

const BankDetailDialog = React.memo(function BankDetailDialog(
    { isOpen, onSubmit, onCancel, titleLabel, submitLabel, onDelete, bankDetail }
) {

    const { register, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            _id: bankDetail?._id,
            detail: bankDetail?.detail
        },
        shouldUnregister: false
    });
    const onFormSubmit = (data) => onSubmit(data);

    return (
        <FormDialog
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
            onCancel={ onCancel }
            onSubmit={ handleSubmit(onFormSubmit) }
            onDelete={ onDelete }
            deleteMessage={ deleteMessage }
        >
            <SideTextField
                label={ detailLabel }
                name="detail"
                inputRef={ register }
                error={ !!errors.detail }
                required
                rows={ 4 }
                rowsMax={ 8 }
                autoFocus
            />
        </FormDialog>
    )
});

export default BankDetailDialog;