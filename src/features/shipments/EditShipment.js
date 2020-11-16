import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Card, Typography } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import NavTabs from '../shared/components/NavTabs.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectShipmentById, selectShipmentError, selectShipmentStatus } from './duck/selectors.js';
import ShipmentInfo from './ShipmentInfo.js';
import Loader from '../shared/components/Loader.js';
import SuccessMessage from '../shared/components/SuccessMessage.js';
import { cleanShipmentStatus } from './duck/slice.js';
import ErrorDisplay from '../shared/components/ErrorDisplay.js';
import ShipmentProductTable from './ShipmentProductTable.js';
import ShipmentMeasureTable from './ShipmentMeasureTable.js';
import ShipmentConsolidationTable from './ShipmentConsolidationTable.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
         margin: theme.spacing(2),
    },
    rootCard: {
        padding: theme.spacing(2),
    },
    cancelButton: {
        marginBottom: theme.spacing(1),
        color: theme.palette.danger.light,
        borderColor: theme.palette.danger.light,
        '&:hover': {
            color: theme.palette.white.main,
            borderColor: theme.palette.danger.dark,
            backgroundColor: theme.palette.danger.main,
        },
    },
    shipmentCards: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }

}));

const {
    titleLabel,
    cancelButtonLabel,
    tabsLabelsMap,
    successMessage
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

    const onTabChange = useCallback(
        (newTab) => {
            setTabValue(newTab);
            dispatch(cleanShipmentStatus());
        },
        [dispatch]);

    const onCancel = useCallback(
        () => history.goBack(),
        [history]);

    useEffect(() => {
        dispatch(cleanShipmentStatus());
    }, [dispatch]);

    return (

        <Box className={classes.root}>
        <ThemedButton 
            className={classes.cancelButton} onClick={ onCancel }
            variant={"outlined"}
        >
                { cancelButtonLabel }
        </ThemedButton>
        <Card className={classes.rootCard}>
            <Typography variant="h5">{ titleLabel }</Typography>
            <NavTabs
                tabsLabelsMap={ tabsLabelsMap }
                tabValue={ tabValue }
                onChange={ onTabChange }
            />
            { shipmentStatus === 'REJECTED' && <ErrorDisplay errors={ [shipmentError] }/> }
            { shipmentStatus === 'FULFILLED' && <SuccessMessage message={ successMessage }/> }
            { shipmentStatus === 'PENDING' && <Loader/> }
            <Box>
                <Box className={classes.shipmentCards} hidden={ tabValue !== 'shipment' }>
                    <ShipmentInfo shipment={ shipment }/>
                </Box>
                <Box className={classes.shipmentCards} hidden={ tabValue !== 'products' }>
                    <ShipmentProductTable shipment={ shipment }/>
                </Box>
                <Box className={classes.shipmentCards} hidden={ tabValue !== 'measures' }>
                    <ShipmentMeasureTable shipment={ shipment }/>
                </Box>
                <Box className={classes.shipmentCards} hidden={ tabValue !== 'consolidation' }>
                    <ShipmentConsolidationTable shipment={ shipment }/>
                </Box>
                
            </Box>
            
        </Card>
        </Box>
    )
});

export default EditShipment;