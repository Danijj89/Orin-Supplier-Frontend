import React, { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { LANGUAGE } from '../../app/utils/constants.js';
import NavTabs from '../shared/components/NavTabs.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectShipmentError, selectShipmentStatus } from './duck/selectors.js';
import ShipmentInfo from './ShipmentInfo.js';
import Loader from '../shared/components/Loader.js';
import SuccessMessage from '../shared/components/SuccessMessage.js';
import { cleanShipmentStatus } from './duck/slice.js';
import ErrorMessages from '../shared/components/ErrorMessages.js';
import ShipmentProductTable from './ShipmentProductTable.js';
import ShipmentMeasureTable from './ShipmentMeasureTable.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import DeleteButton from '../shared/buttons/DeleteButton.js';
import { deleteShipment } from './duck/thunks.js';
import queryString from 'query-string';
import { DELETE_ANY, DELETE_OWN } from '../admin/utils/actions.js';
import ShipmentPermission from '../shared/permissions/ShipmentPermission.js';

const useStyles = makeStyles((theme) => ({
    title: {
        margin: theme.spacing(2),
    },
}));

const {
    titleLabel,
    cancelButtonLabel,
    tabsLabelsMap,
    successMessage,
    deleteMessage,
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

    const onTabChange = useCallback(
        (newValue) => {
            dispatch(cleanShipmentStatus());
            history.push(`${ location.pathname }?tab=${ newValue }`);
        },
        [dispatch, history, location.pathname]
    );

    const onCancel = useCallback(
        () => history.push(`/home/shipments/${ shipmentId }`),
        [history, shipmentId]
    );

    const onDelete = useCallback(() => {
        dispatch(deleteShipment({ shipmentId }));
        history.push('/home/shipments');
    }, [history, dispatch, shipmentId]);

    return (
        <Box className={ classes.container }>
            <ThemedButton
                variant="text"
                onClick={ onCancel }
                className={ classes.newContact }
            >
                { cancelButtonLabel }
            </ThemedButton>
            <Card>
                <Grid container item justify="space-between">
                    <Typography className={ classes.title } variant="h5">
                        { titleLabel }
                    </Typography>
                    <ShipmentPermission action={ [DELETE_ANY, DELETE_OWN] } shipmentId={shipmentId}>
                        <DeleteButton
                            onDelete={ onDelete }
                            deleteMessage={ deleteMessage }
                        />
                    </ShipmentPermission>
                </Grid>
                <NavTabs
                    tabsLabelsMap={ tabsLabelsMap }
                    tabValue={ tabValue }
                    onChange={ onTabChange }
                />
                { shipmentStatus === 'REJECTED' && (
                    <ErrorMessages error={ [shipmentError] }/>
                ) }
                { shipmentStatus === 'FULFILLED' && (
                    <SuccessMessage message={ successMessage }/>
                ) }
                { shipmentStatus === 'PENDING' && <Loader/> }
            </Card>
            <Box>
                { tabValue === 'shipment' && (
                    <ShipmentInfo onCancel={ onCancel }/>
                ) }
                { tabValue === 'products' && (
                    <ShipmentProductTable onCancel={ onCancel }/>
                ) }
                { tabValue === 'measures' && (
                    <ShipmentMeasureTable onCancel={ onCancel }/>
                ) }
            </Box>
        </Box>
    );
});

export default EditShipment;
