import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
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
    const { id } = useParams();
    const shipmentStatus = useSelector(selectShipmentStatus);
    const shipmentError = useSelector(selectShipmentError);
    const shipment = useSelector(state => selectShipmentById(state, id));

    const [tabValue, setTabValue] = useState('shipment');

    useEffect(() => {
        dispatch(cleanShipmentStatus());
    }, [dispatch]);

    const onTabChange = useCallback(
        (newTab) => {
            setTabValue(newTab);
            dispatch(cleanShipmentStatus());
        },
        [dispatch]);

    const onCancel = useCallback(
        () => history.goBack(),
        [history]);

    const onDelete = useCallback(
        () => {
            dispatch(deleteShipment({ shipmentId: id}));
            history.push('/home/shipments');
        },
        [history, dispatch, id]);

    return (
        <Box className={ classes.container }>
            <Card>
                <Grid container>
                    <Grid container item justify="space-between">
                        <ThemedButton
                            onClick={ onCancel }
                            variant="outlined"
                            className={ classes.cancelButton }
                        >{ cancelButtonLabel }</ThemedButton>
                        <DeleteButton
                            onDelete={ onDelete }
                            deleteMessage={deleteMessage }
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">{ titleLabel }</Typography>
                    </Grid>
                    <Grid item>
                        <NavTabs
                            tabsLabelsMap={ tabsLabelsMap }
                            tabValue={ tabValue }
                            onChange={ onTabChange }
                        />
                        { shipmentStatus === 'REJECTED' && <ErrorMessages errors={ [shipmentError] }/> }
                        { shipmentStatus === 'FULFILLED' && <SuccessMessage message={ successMessage }/> }
                        { shipmentStatus === 'PENDING' && <Loader/> }
                    </Grid>
                </Grid>
            </Card>
            <Box>
                <Box hidden={ tabValue !== 'shipment' }>
                    <ShipmentInfo shipment={ shipment }/>
                </Box>
                { tabValue === 'products' &&
                <ShipmentProductTable shipment={ shipment }/>
                }
                { tabValue === 'measures' &&
                <ShipmentMeasureTable shipment={ shipment }/>
                }
                <Box hidden={ tabValue !== 'consolidation' }>
                    <ShipmentConsolidationTable shipment={ shipment }/>
                </Box>
            </Box>
        </Box>
    )
});

export default EditShipment;