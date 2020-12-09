import React, { useEffect } from 'react';
import RHFMeasureTable, {
    validateItemMeasures,
} from '../shared/rhf/forms/RHFMeasureTable.js';
import { useForm } from 'react-hook-form';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { updateShipment } from './duck/thunks.js';
import { tableItemsToItems } from '../shared/utils/entityConversion.js';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useParams } from 'react-router-dom';
import { selectShipmentById } from './duck/selectors.js';
import { getOptionId } from '../../app/utils/options/getters.js';
import Footer from '../shared/components/Footer.js';

const measureTableFieldNames = {
    custom1: 'plCustom1',
    custom2: 'plCustom2',
    package: 'package',
    netWeight: 'netWeight',
    grossWeight: 'grossWeight',
    dimension: 'dimension',
    weightUnit: 'weightUnit',
    measurementUnit: 'measurementUnit',
    items: 'items',
    marks: 'marks',
};

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(3),
    },
}));

const {
    submitButtonLabel,
    cancelButtonLabel,
} = LANGUAGE.shipment.editShipment.measureTable;

const ShipmentMeasureTable = React.memo(function ShipmentMeasureTable({
    onCancel,
}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id: shipmentId } = useParams();
    const shipment = useSelector((state) =>
        selectShipmentById(state, { shipmentId })
    );

    const {
        register,
        control,
        errors,
        setValue,
        getValues,
        handleSubmit,
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [measureTableFieldNames.items]: shipment.items,
            [measureTableFieldNames.measurementUnit]: shipment.measurementUnit,
            [measureTableFieldNames.weightUnit]: shipment.weightUnit,
            [measureTableFieldNames.package]: shipment.package,
            [measureTableFieldNames.netWeight]: shipment.netWeight,
            [measureTableFieldNames.grossWeight]: shipment.grossWeight,
            [measureTableFieldNames.dimension]: shipment.dimension,
            [measureTableFieldNames.custom1]: shipment.plCustom1,
            [measureTableFieldNames.custom2]: shipment.plCustom2,
            [measureTableFieldNames.marks]: shipment.marks,
        },
    });

    useEffect(() => {
        register(
            { name: measureTableFieldNames.items },
            { validate: validateItemMeasures }
        );
        register({ name: measureTableFieldNames.custom1 });
        register({ name: measureTableFieldNames.custom2 });
        register({ name: measureTableFieldNames.package });
        register({ name: measureTableFieldNames.netWeight });
        register({ name: measureTableFieldNames.grossWeight });
        register({ name: measureTableFieldNames.dimension });
    }, [register]);

    const onSubmit = (data) => {
        data.items = tableItemsToItems(data.items);
        data.weightUnit = getOptionId(data.weightUnit);
        data.measurementUnit = getOptionId(data.measurementUnit);
        dispatch(updateShipment({ shipmentId, update: data }));
    };

    return (
        <Paper>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <RHFMeasureTable
                    rhfRegister={register}
                    rhfControl={control}
                    rhfGetValues={getValues}
                    rhfSetValue={setValue}
                    rhfErrors={errors}
                    fieldNames={measureTableFieldNames}
                    className={classes.card}
                />
                <Footer
                    prevLabel={cancelButtonLabel}
                    nextLabel={submitButtonLabel}
                    onPrevClick={onCancel}
                    nextButtonType="submit"
                />
            </form>
        </Paper>
    );
});

export default ShipmentMeasureTable;
