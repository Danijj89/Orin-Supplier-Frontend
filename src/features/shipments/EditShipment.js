import React, { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { LANGUAGE } from 'app/utils/constants.js';
import NavTabs from '../shared/components/NavTabs.js';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ShipmentInfo from './ShipmentInfo.js';
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
    titles,
    buttons,
    tabLabels,
    messages,
} = LANGUAGE.shipment.editShipment;

const EditShipment = React.memo(function EditShipment() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { id: shipmentId } = useParams();
    const location = useLocation();
    const { tab } = queryString.parse(location.search);
    const tabValue = tab || 'shipment';

    const onTabChange = useCallback(
        (newValue) => history.push(`${ location.pathname }?tab=${ newValue }`),
        [history, location.pathname]
    );

    const onBack = useCallback(
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
                onClick={ onBack }
                className={ classes.newContact }
            >
                { buttons.back }
            </ThemedButton>
            <Card>
                <Grid container item justify="space-between">
                    <Typography className={ classes.title } variant="h5">
                        { titles.shipment }
                    </Typography>
                    <ShipmentPermission action={ [DELETE_ANY, DELETE_OWN] } shipmentId={shipmentId}>
                        <DeleteButton
                            onDelete={ onDelete }
                            deleteMessage={ messages.deleteShipment }
                        />
                    </ShipmentPermission>
                </Grid>
                <NavTabs
                    tabsLabelsMap={ tabLabels }
                    tabValue={ tabValue }
                    onChange={ onTabChange }
                />
            </Card>
            <Box>
                { tabValue === 'shipment' && (
                    <ShipmentInfo onCancel={ onBack }/>
                ) }
                { tabValue === 'products' && (
                    <ShipmentProductTable onCancel={ onBack }/>
                ) }
                { tabValue === 'measures' && (
                    <ShipmentMeasureTable onCancel={ onBack }/>
                ) }
            </Box>
        </Box>
    );
});

export default EditShipment;
