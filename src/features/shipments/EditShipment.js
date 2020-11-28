import React, { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { LANGUAGE } from '../../app/utils/constants.js';
import NavTabs from '../shared/components/NavTabs.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectShipmentById, selectShipmentError, selectShipmentStatus } from './duck/selectors.js';
import ShipmentInfo from './ShipmentInfo.js';
import Loader from '../shared/components/Loader.js';
import SuccessMessage from '../shared/components/SuccessMessage.js';
import { cleanShipmentStatus } from './duck/slice.js';
import ErrorMessages from '../shared/components/ErrorMessages.js';
import ShipmentProductTable from './ShipmentProductTable.js';
import ShipmentMeasureTable from './ShipmentMeasureTable.js';
import ShipmentConsolidationTable from './ShipmentConsolidationTable.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import DeleteButton from '../shared/buttons/DeleteButton.js';
import { deleteShipment } from './duck/thunks.js';
import queryString from 'query-string';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(2),
    },
    cancelButton: {
        marginBottom: theme.spacing(1),
        color: theme.palette.danger.light,
        borderColor: theme.palette.danger.light,
        '&:hover': {
            color: theme.palette.white.main,
            borderColor: theme.palette.danger.dark,
            backgroundColor: theme.palette.danger.main,
        }
    }
}));

const {
    titleLabel,
    cancelButtonLabel,
    tabsLabelsMap,
    successMessage,
    deleteMessage
} = LANGUAGE.shipment.editShipment;

const EditShipment = React.memo(function EditShipment() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { id: shipmentId } = useParams();
    const location = useLocation();
    const { tab } = queryString.parse(location.search);
    const tabValue = tab || 'shipment';
    const shipmentStatus = useSelector(selectShipmentStatus);
    const shipmentError = useSelector(selectShipmentError);
    const shipment = useSelector(state => selectShipmentById(state, shipmentId));

    const onTabChange = useCallback(
        (newValue) => {
            dispatch(cleanShipmentStatus());
            history.push(`${ location.pathname }?tab=${ newValue }`);
        },
        [dispatch, history, location.pathname]);

    const onCancel = useCallback(
        () => history.push(`/home/shipments/${ shipmentId }`),
        [history, shipmentId]);

    const onDelete = useCallback(
        () => {
            dispatch(deleteShipment({ shipmentId }));
            history.push('/home/shipments');
        },
        [history, dispatch, shipmentId]);

    return (
        <Box className={ classes.container }>
            <Card>
                <Grid container item justify="space-between">
                    <ThemedButton
                        onClick={ onCancel }
                        variant="outlined"
                        className={ classes.cancelButton }
                    >{ cancelButtonLabel }</ThemedButton>
                    <DeleteButton
                        onDelete={ onDelete }
                        deleteMessage={ deleteMessage }
                    />
                </Grid>
                <Typography variant="h5">{ titleLabel }</Typography>
                <NavTabs
                    tabsLabelsMap={ tabsLabelsMap }
                    tabValue={ tabValue }
                    onChange={ onTabChange }
                />
                { shipmentStatus === 'REJECTED' && <ErrorMessages errors={ [shipmentError] }/> }
                { shipmentStatus === 'FULFILLED' && <SuccessMessage message={ successMessage }/> }
                { shipmentStatus === 'PENDING' && <Loader/> }
            </Card>
            <Box>
                { tabValue === 'shipment' && <ShipmentInfo shipment={ shipment }/> }
                { tabValue === 'products' && <ShipmentProductTable shipment={ shipment }/> }
                { tabValue === 'measures' && <ShipmentMeasureTable shipment={ shipment }/> }
                { tabValue === 'consolidation' && <ShipmentConsolidationTable shipment={ shipment }/> }
            </Box>
        </Box>
    )
});

export default EditShipment;