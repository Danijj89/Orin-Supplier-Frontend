import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLeadById } from './duck/selectors.js';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form';
import FormContainer from '../shared/wrappers/FormContainer.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import SideTextField from '../shared/inputs/SideTextField.js';
import RHFDateField from '../shared/rhf/inputs/RHFDateField.js';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { selectAllActiveUsers, selectUsersMap } from '../users/duck/selectors.js';
import Box from '@material-ui/core/Box';
import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { dateToLocaleDate } from '../shared/utils/format.js';
import StatusDropdown from '../shared/components/StatusDropdown.js';
import { selectLeadPotentials, selectLeadTypes, selectSalesStatuses } from '../../app/duck/selectors.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { getOptionId } from '../../app/utils/options/getters.js';
import { updateLead } from './duck/thunks.js';

const {
    formLabels,
    createdAtLabel,
    leadInfoTitleLabel,
    salesInfoTitleLabel,
    saveButtonLabel
} = LANGUAGE.lead.lead.leadDetails;

const LeadDetails = React.memo(function LeadDetails({ leadId }) {
    const dispatch = useDispatch();
    const users = useSelector(selectAllActiveUsers);
    const usersMap = useSelector(selectUsersMap);
    const salesStatusOptions = useSelector(selectSalesStatuses);
    const leadTypeOptions = useSelector(selectLeadTypes);
    const leadPotentialOptions = useSelector(selectLeadPotentials);
    const lead = useSelector(state => selectLeadById(state, { leadId }));

    const { register, control, errors, watch, setValue, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            name: lead.name,
            contactName: lead.contact?.name,
            contactEmail: lead.contact?.email,
            phone: lead.contact?.phone,
            additional: lead.contact?.additional,
            source: lead.source,
            quotation: lead.quotation,
            sample: lead.sample,
            lastContact: lead.lastContact,
            assignedTo: usersMap[lead.assignedTo] || null,
            notes: lead.notes,
            salesStatus: lead.salesStatus,
            leadType: lead.leadType,
            leadPotential: lead.leadPotential
        }
    });

    useEffect(() => {
        register({ name: 'salesStatus' }, { required: true });
        register({ name: 'leadType' }, { required: true });
        register({ name: 'leadPotential' }, { required: true });
    }, [register]);

    const salesStatus = watch('salesStatus');
    const leadType = watch('leadType');
    const leadPotential = watch('leadPotential');

    const createStatusChangeHandler = useCallback(
        (statusType) => (newStatus) => setValue(statusType, newStatus),
        [setValue]);

    const onSubmit = useCallback(
        (data) => {
            const { contactName, contactEmail, phone, additional, ...update } = data;
            update.contact = {
                name: contactName,
                email: contactEmail,
                phone: phone,
                additional: additional
            };
            update.salesStatus = getOptionId(update.salesStatus);
            update.leadType = getOptionId(update.leadType);
            update.leadPotential = getOptionId(update.leadPotential);
            if (update.assignedTo) update.assignedTo = update.assignedTo._id;
            dispatch(updateLead({ leadId, update }));
        },
        [dispatch, leadId]);

    return (
        <form onSubmit={ handleSubmit(onSubmit) } autoComplete="off" noValidate>
            <Grid container>
                <Grid container item alignItems="flex-start" xs={ 12 }>
                    <Grid container item justify="center" md>
                        <Typography variant="h5">{ leadInfoTitleLabel }</Typography>
                        <FormContainer>
                            <SideTextField
                                label={ formLabels.name }
                                name="name"
                                inputRef={ register({ required: true }) }
                                error={ !!errors.name }
                                required
                            />
                            <SideTextField
                                label={ formLabels.contactName }
                                name="contactName"
                                inputRef={ register }
                            />
                            <SideTextField
                                label={ formLabels.contactEmail }
                                name="contactEmail"
                                inputRef={ register }
                                type="email"
                            />
                            <SideTextField
                                label={ formLabels.phone }
                                name="phone"
                                inputRef={ register }
                            />
                            <SideTextField
                                label={ formLabels.additional }
                                name="additional"
                                inputRef={ register }
                            />
                            <Grid container item xs={12}>
                                <Typography variant="subtitle1">
                                    { formLabels.salesStatus }
                                </Typography>
                                <StatusDropdown
                                    status={ salesStatus }
                                    statuses={ salesStatusOptions }
                                    colorMap="salesStatus"
                                    onStatusChange={ createStatusChangeHandler('salesStatus') }
                                />
                            </Grid>
                            <Grid container item xs={12}>
                                <Typography variant="subtitle1">
                                    { formLabels.leadType }
                                </Typography>
                                <StatusDropdown
                                    status={ leadType }
                                    statuses={ leadTypeOptions }
                                    colorMap="leadType"
                                    onStatusChange={ createStatusChangeHandler('leadType') }
                                />
                            </Grid>
                            <Grid container item xs={12}>
                                <Typography variant="subtitle1">
                                    { formLabels.leadPotential }
                                </Typography>
                                <StatusDropdown
                                    status={ leadPotential }
                                    statuses={ leadPotentialOptions }
                                    colorMap="leadPotential"
                                    onStatusChange={ createStatusChangeHandler('leadPotential') }
                                />
                            </Grid>
                        </FormContainer>
                    </Grid>
                    <Grid container item justify="center" md={ 1 }>
                        <Box component={ Divider } display={ { xs: 'none', lg: 'block' } } orientation="vertical"/>
                    </Grid>
                    <Grid container item justify="center" md>
                        <Typography variant="h5">{ salesInfoTitleLabel }</Typography>
                        <FormContainer>
                            <Typography
                                variant="subtitle1"
                            >
                                { `${ createdAtLabel } ${ dateToLocaleDate(lead.createdAt) }` }
                            </Typography>
                            <SideTextField
                                label={ formLabels.source }
                                name="source"
                                inputRef={ register }
                            />
                            <RHFDateField
                                rhfControl={ control }
                                name="quotation"
                                label={ formLabels.quotation }
                            />
                            <RHFDateField
                                rhfControl={ control }
                                name="sample"
                                label={ formLabels.sample }
                            />
                            <RHFDateField
                                rhfControl={ control }
                                name="lastContact"
                                label={ formLabels.lastContact }
                            />
                            <RHFAutoComplete
                                rhfControl={ control }
                                name="assignedTo"
                                label={ formLabels.assignedTo }
                                options={ users }
                                getOptionLabel={ option => option.name }
                                getOptionSelected={ (option, value) => option._id === value._id || !value.active }
                            />
                            <SideTextField
                                name="notes"
                                multiline
                                rows={ 4 }
                                rowsMax={ 8 }
                                label={ formLabels.notes }
                                inputRef={ register }
                            />
                            <ThemedButton type="submit">
                                {saveButtonLabel}
                            </ThemedButton>
                        </FormContainer>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
});

export default LeadDetails;