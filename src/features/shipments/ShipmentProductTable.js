import React, { useEffect } from 'react';
import RHFProductTable, { validateItems } from '../shared/rhf/forms/RHFProductTable.js';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveProducts } from '../products/duck/selectors.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/constants.js';
import { updateShipment } from './duck/thunks.js';
import { productTableItemsToItems } from '../shared/utils/entityConversion.js';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const productTableFieldNames = {
    custom1: 'ciCustom1',
    custom2: 'ciCustom2',
    currency: 'currency',
    items: 'items',
    quantity: 'quantity',
    total: 'total',
    marks: 'marks'
};

const useStyles = makeStyles((theme) => ({
    submitButton: {
         marginTop: theme.spacing(2),
    },
}));

const {
    submitButtonLabel
} = LANGUAGE.shipment.editShipment.productTable;

const ShipmentProductTable = React.memo(function ShipmentProductTable(
    { shipment }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const products = useSelector(selectActiveProducts);
    const { register, control, errors, setValue, getValues, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [productTableFieldNames.currency]: shipment.currency,
            [productTableFieldNames.items]: shipment.items,
            [productTableFieldNames.quantity]: shipment.quantity,
            [productTableFieldNames.total]: shipment.total,
            [productTableFieldNames.custom1]: shipment.ciCustom1,
            [productTableFieldNames.custom2]: shipment.ciCustom2,
            [productTableFieldNames.marks]: shipment.marks,
        }
    });

    useEffect(() => {
        register({ name: productTableFieldNames.items }, { validate: validateItems });
        register({ name: productTableFieldNames.custom1 });
        register({ name: productTableFieldNames.custom2 });
        register({ name: productTableFieldNames.quantity });
        register({ name: productTableFieldNames.total });
    }, [register]);

    const onSubmit = (data) => {
        data.items = productTableItemsToItems(data.items, shipment._id);
        dispatch(updateShipment({ id: shipment._id, update: data }));
    };

    return (
        <Paper>
            <form onSubmit={ handleSubmit(onSubmit) } autoComplete="off">
                <RHFProductTable
                    rhfRegister={ register }
                    rhfErrors={ errors }
                    rhfControl={ control }
                    rhfSetValue={ setValue }
                    rhfGetValues={ getValues }
                    products={ products }
                    fieldNames={ productTableFieldNames }
                    isEdit
                />
                <ThemedButton className={classes.submitButton} type="submit">{ submitButtonLabel }</ThemedButton>
            </form>
        </Paper>
    )
});

export default ShipmentProductTable;