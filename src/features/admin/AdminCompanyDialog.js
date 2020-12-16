import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import FormDialog from '../shared/wrappers/FormDialog.js';
import { useForm } from 'react-hook-form';
import SideTextField from '../shared/inputs/SideTextField.js';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { getOptionId, getOptionLabel } from '../../app/utils/options/getters.js';
import { LANGUAGE, LOCALE } from '../../app/utils/constants.js';
import { useSelector } from 'react-redux';
import { selectCountries, selectCurrencies, selectIndustries } from '../../app/duck/selectors.js';

const {
    formLabels
} = LANGUAGE.admin.admin.adminCompanyDialog;

const AdminCompanyDialog = React.memo(function AdminCompanyDialog(
    { onSubmit, onCancel, isOpen, titleLabel, submitLabel }) {
    const countryOptions = useSelector(selectCountries);
    const currencyOptions = useSelector(selectCurrencies);
    const industryOptions = useSelector(selectIndustries);

    const { register, control, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            type: '',
            name: '',
            address: '',
            address2: null,
            city: '',
            administrative: null,
            country: null,
            zip: null,
            phone: null,
            email: null,
            taxNumber: null,
            currency: null,
            industries: []
        }
    });

    const onFormSubmit = useCallback((data) => {
        const { taxNumber, currency, industries, ...address } = data;
        const company = {
            taxNumber,
            currency: getOptionId(currency),
            industries: industries.map(industry => getOptionId(industry)),
            address: {
                ...address,
                country: getOptionId(address.country)
            }
        };
        onSubmit(company);
    }, [onSubmit]);

    return (
        <FormDialog
            onSubmit={ handleSubmit(onFormSubmit) }
            onCancel={ onCancel }
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
        >
            <SideTextField
                label={ formLabels.type }
                name="type"
                inputRef={ register({ required: true }) }
                error={ !!errors.type }
                autoFocus
                required
            />
            <SideTextField
                label={ formLabels.name }
                name="name"
                inputRef={ register({ required: true }) }
                error={ !!errors.name }
                required
            />
            <SideTextField
                label={ formLabels.address }
                name="address"
                inputRef={ register({ required: true }) }
                error={ !!errors.address }
                required
            />
            <SideTextField
                label={ formLabels.address2 }
                name="address2"
                inputRef={ register }
            />
            <SideTextField
                label={ formLabels.city }
                name="city"
                inputRef={ register({ required: true }) }
                error={ !!errors.city }
                required
            />
            <SideTextField
                label={ formLabels.administrative }
                name="administrative"
                inputRef={ register }
            />
            <RHFAutoComplete
                rhfControl={ control }
                label={ formLabels.country }
                name="country"
                options={ countryOptions }
                getOptionLabel={ option => getOptionLabel(option, LOCALE) }
                getOptionSelected={ (option, value) => option.id === value.id }
                error={ !!errors.country }
                required
            />
            <SideTextField
                label={ formLabels.zip }
                name="zip"
                inputRef={ register }
            />
            <SideTextField
                label={ formLabels.phone }
                name="phone"
                inputRef={ register }
            />
            <SideTextField
                label={ formLabels.email }
                name="email"
                inputRef={ register }
            />
            <SideTextField
                label={ formLabels.taxNumber }
                name="taxNumber"
                inputRef={ register }
            />
            <RHFAutoComplete
                rhfControl={ control }
                label={ formLabels.currency }
                name="currency"
                options={ currencyOptions }
                getOptionLabel={ option => getOptionLabel(option, LOCALE) }
                getOptionSelected={ (option, value) => option.id === value.id }
            />
            <RHFAutoComplete
                rhfControl={ control }
                name="industries"
                label={ formLabels.industries }
                options={ industryOptions }
                getOptionLabel={ option => getOptionLabel(option, LOCALE) }
                getOptionSelected={ (option, value) => option.id === value.id }
                error={ !!errors.industries }
                multiple
                required
            />
        </FormDialog>
    );
});

AdminCompanyDialog.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    titleLabel: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired
};

export default AdminCompanyDialog;