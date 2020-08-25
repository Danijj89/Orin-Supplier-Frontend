import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectNewPL } from './duck/selectors.js';

// const { invoiceNumber, invoiceDate, importer, importerAddress,
//     exporter, exporterAddressLabel, countryOfManufacture, buttonCancel, buttonNext } = LANGUAGE.commercialInvoice.createCIDetailsForm;
//
// const useStyles = makeStyles({
//     form: {
//         padding: '24px 25%'
//     },
//     field: {
//         margin: '10px 0'
//     },
//     buttons: {
//         marginTop: '5%'
//     }
// })

export default function CreateOrderDetailsForm({ order, setActiveStep }) {
    // const classes = useStyles();
    // const dispatch = useDispatch();
    // const history = useHistory();
    //
    // const { _id: userId } = useSelector(selectCurrentUser);
    // const {
    //     _id: companyId,
    //     names: exporterNames,
    //     address: exporterAddress,
    //     addresses: exporterAddresses
    // } = useSelector(selectCurrentCompany);
    // const { customerNames, customerAddressMap } = useSelector(selectCIAutocompleteOptions);
    const { from } = order.documents.CI;
    const { plRef, date, com, notes, scRef, paymentRef } = useSelector(selectNewPL);

    const { register, control, handleSubmit, watch, errors, formState } = useForm({
        mode: 'onBlur',
        defaultValues: {
            plRef,
            from,
            // fromName: exporterNames[0],
            // fromAdd: exporterAddress,
            // to: order.from,
            // toName: order.fromName,
            // toAdd: order.fromAdd,
            // date: date.substr(0, 10),
            // com,
            // pol: order.pol,
            // pod: order.pod,
            // notes,
            // scRef,
            // paymentRef
        }
    });
    //
    // const chosenCustomer = watch('toName', []);
    // const chosenCustomerAddresses = () =>
    //     customerAddressMap.hasOwnProperty(chosenCustomer)
    //         ? customerAddressMap[chosenCustomer]
    //         : [];
    //
    // const onButtonNextClick = (data) => {
    //     data.createdBy = userId;
    //     data.from = companyId;
    //     data.fileName = getFileName('CI', data.ciRef, data.createdBy);
    //     dispatch(submitCIDetails(data));
    // }
    //
    // const onButtonCancelClick = () => history.goBack();

    return (
        <div>Hi</div>
        // <form className={classes.form} onSubmit={handleSubmit(onButtonNextClick)} autoComplete="off">
        //     <TextField
        //         label={invoiceNumber}
        //         type="text"
        //         name="ciRef"
        //         error={!!errors.ciRef}
        //         inputRef={register({ required: true })}
        //         className={classes.field}
        //         fullWidth
        //         autoFocus
        //         required
        //     />
        //     <TextField
        //         label={invoiceDate}
        //         type="date"
        //         name="date"
        //         error={!!errors.date}
        //         inputRef={register({ required: true })}
        //         className={classes.field}
        //         fullWidth
        //         required
        //     />
        //     <Controller
        //         render={props => (
        //             <Autocomplete
        //                 freeSolo
        //                 autoSelect
        //                 {...props}
        //                 options={customerNames}
        //                 renderInput={params => (
        //                     <TextField
        //                         {...params}
        //                         label={importer}
        //                         variant="standard"
        //                         error={!!errors.toName}
        //                         className={classes.field}
        //                         required
        //                     />
        //                 )}
        //                 onChange={(_, data) => props.onChange(data)}
        //             />
        //         )}
        //         name="toName"
        //         control={control}
        //         rules={{ required: true }}
        //     />
        //     <Controller
        //         render={props => (
        //             <Autocomplete
        //                 freeSolo
        //                 autoSelect
        //                 {...props}
        //                 options={chosenCustomerAddresses()}
        //                 renderInput={params => (
        //                     <TextField
        //                         {...params}
        //                         label={importerAddress}
        //                         variant="standard"
        //                         error={!!errors.toAdd}
        //                         className={classes.field}
        //                         required
        //                     />
        //                 )}
        //                 onChange={(_, data) => props.onChange(data)}
        //             />
        //         )}
        //         name="toAdd"
        //         control={control}
        //         rules={{ required: true }}
        //     />
        //     <Controller
        //         render={props => (
        //             <Autocomplete
        //                 freeSolo
        //                 autoSelect
        //                 {...props}
        //                 options={exporterNames}
        //                 renderInput={params => (
        //                     <TextField
        //                         {...params}
        //                         label={exporter}
        //                         variant="standard"
        //                         error={!!errors.fromName}
        //                         className={classes.field}
        //                         required
        //                     />
        //                 )}
        //                 onChange={(_, data) => props.onChange(data)}
        //             />
        //         )}
        //         name="fromName"
        //         control={control}
        //         rules={{ required: true }}
        //     />
        //     <Controller
        //         render={props => (
        //             <Autocomplete
        //                 freeSolo
        //                 autoSelect
        //                 {...props}
        //                 options={exporterAddresses}
        //                 renderInput={params => (
        //                     <TextField
        //                         {...params}
        //                         label={exporterAddressLabel}
        //                         variant="standard"
        //                         error={!!errors.fromAdd}
        //                         className={classes.field}
        //                         required
        //                     />
        //                 )}
        //                 onChange={(_, data) => props.onChange(data)}
        //             />
        //         )}
        //         name="fromAdd"
        //         control={control}
        //         rules={{ required: true }}
        //     />
        //     <TextField
        //         label={countryOfManufacture}
        //         type="text"
        //         name="com"
        //         inputRef={register}
        //         className={classes.field}
        //         fullWidth
        //     />
        //     <CreateCIAdditionalInfo register={register} control={control} />
        //     <Grid
        //         container
        //         justify="space-around"
        //         className={classes.buttons}
        //     >
        //         <Grid item>
        //             <Button
        //                 variant="outlined"
        //                 onClick={onButtonCancelClick}
        //             >
        //                 {buttonCancel}
        //             </Button>
        //         </Grid>
        //         <Grid item>
        //             <Button
        //                 variant="contained"
        //                 disabled={!formState.isValid}
        //                 type="submit"
        //             >
        //                 {buttonNext}
        //             </Button>
        //         </Grid>
        //     </Grid>
        // </form>
    )
}