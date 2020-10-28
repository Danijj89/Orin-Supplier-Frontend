import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import FormDialog from '../wrappers/FormDialog.js';
import { Controller, useForm } from 'react-hook-form';
import { LANGUAGE } from '../../../app/constants.js';
import SideTextField from '../inputs/SideTextField.js';
import SideAutoComplete from '../inputs/SideAutoComplete.js';
import { currenciesOptions, industriesOptions } from '../constants.js';

const { taxNumberLabel, defaultCurrencyLabel, industriesLabel } = LANGUAGE.shared.forms.companyDialog;

export default function CompanyDialog(
    { company, isOpen, titleLabel, submitLabel, onSubmit, onCancel, className }) {

    const { register, errors, handleSubmit, control, reset } = useForm({
        mode: 'onSubmit'
    });

    const onFormSubmit = (data) => onSubmit(data);

    useEffect(() => {
        reset({
            taxNumber: company?.taxNumber,
            defaultCurrency: company?.defaultCurrency,
            industries: company?.industries || []
        });
    }, [reset, company]);

    return (
        <FormDialog
            className={ className }
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
            onCancel={ onCancel }
            onSubmit={ handleSubmit(onFormSubmit) }
        >
            <SideTextField
                label={ taxNumberLabel }
                name="taxNumber"
                inputRef={ register({ required: true }) }
                error={ !!errors.taxNumber }
                autoFocus
                fullWidth
            />
            <Controller
                render={ props =>
                    <SideAutoComplete
                        { ...props }
                        label={ defaultCurrencyLabel }
                        options={ currenciesOptions }
                        error={ !!errors.defaultCurrency }
                    />
                }
                name="defaultCurrency"
                control={ control }
            />
            <Controller
                render={ props =>
                    <SideAutoComplete
                        { ...props }
                        label={ industriesLabel }
                        options={ industriesOptions }
                        error={ !!errors.industries }
                        multiple
                        required
                    />
                }
                name="industries"
                control={ control }
                rules={ { required: true } }
            />
        </FormDialog>
    )
}

CompanyDialog.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    titleLabel: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired,
    className: PropTypes.string,
    company: PropTypes.object
};