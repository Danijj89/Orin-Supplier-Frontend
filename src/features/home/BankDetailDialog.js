import React, { useEffect } from 'react';
import FormDialog from '../shared/wrappers/FormDialog.js';
import { useForm } from 'react-hook-form';
import { LANGUAGE } from '../../app/utils/constants.js';
import SideTextField from '../shared/inputs/SideTextField.js';

const {
    deleteMessage,
    detailLabel
} = LANGUAGE.home.companyDetails.bankDetailDialog;

const BankDetailDialog = React.memo(function BankDetailDialog(
    { isOpen, onSubmit, onCancel, titleLabel, submitLabel, onDelete, bankDetail }
) {

    const { register, errors, handleSubmit, reset } = useForm({
        mode: 'onSubmit'
    });

    useEffect(() => {
        reset({
            _id: bankDetail?._id,
            detail: bankDetail?.detail
        });
    }, [reset, bankDetail]);

    return (
        <FormDialog
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
            onCancel={ onCancel }
            onSubmit={ handleSubmit(onSubmit) }
            onDelete={ onDelete }
            deleteMessage={ deleteMessage }
        >
            <SideTextField
                label={ detailLabel }
                name="detail"
                inputRef={ register({ required: true }) }
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