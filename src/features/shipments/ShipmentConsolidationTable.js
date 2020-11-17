import React, { useEffect } from 'react';
import RHFConsolidationTable from '../shared/rhf/forms/RHFConsolidationTable.js';
import { useForm } from 'react-hook-form';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch } from 'react-redux';
import { updateShipment } from './duck/thunks.js';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const consolidationTableFieldNames = {
    custom1: 'coCustom1',
    custom2: 'coCustom2',
    package: 'coPackage',
    netWeight: 'coNetWeight',
    grossWeight: 'coGrossWeight',
    dimension: 'coDimension',
    weightUnit: 'weightUnit',
    measurementUnit: 'measurementUnit',
    items: 'coItems'
};

const useStyles = makeStyles((theme) => ({
    submitButton: {
         marginTop: theme.spacing(2),
    }
}));

const {
    submitButtonLabel
} = LANGUAGE.shipment.editShipment.consolidationTable;

const ShipmentConsolidationTable = React.memo(function ShipmentConsolidationTable({ shipment }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { register, control, errors, setValue, getValues, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [consolidationTableFieldNames.custom1]: shipment.coCustom1,
            [consolidationTableFieldNames.custom2]: shipment.coCustom2,
            [consolidationTableFieldNames.package]: shipment.coPackage,
            [consolidationTableFieldNames.netWeight]: shipment.coNetWeight,
            [consolidationTableFieldNames.grossWeight]: shipment.coGrossWeight,
            [consolidationTableFieldNames.dimension]: shipment.coDimension,
            [consolidationTableFieldNames.measurementUnit]: shipment.measurementUnit,
            [consolidationTableFieldNames.weightUnit]: shipment.weightUnit,
            [consolidationTableFieldNames.items]: shipment.coItems || []
        }
    });

    useEffect(() => {
        register({ name: consolidationTableFieldNames.custom1 });
        register({ name: consolidationTableFieldNames.custom2 });
        register({ name: consolidationTableFieldNames.package });
        register({ name: consolidationTableFieldNames.netWeight });
        register({ name: consolidationTableFieldNames.grossWeight });
        register({ name: consolidationTableFieldNames.dimension });
        register({ name: consolidationTableFieldNames.items });
    }, [register]);

    const onSubmit = (data) => {
        data.coItems = data.coItems.map(item => {
            item.shipment = shipment._id;
            return item;
        });
        dispatch(updateShipment({ id: shipment._id, update: data}));
    };

    return (
        <Paper>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <RHFConsolidationTable
                    rhfRegister={ register }
                    rhfControl={ control }
                    rhfSetValue={ setValue }
                    rhfGetValues={ getValues }
                    rhfErrors={ errors }
                    fieldNames={ consolidationTableFieldNames }
                />
                <ThemedButton className={classes.submitButton} type="submit">{ submitButtonLabel }</ThemedButton>
            </form>
        </Paper>
    )
});

export default ShipmentConsolidationTable;