import React, { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from 'app/utils/constants.js';
import ShipmentsTable from './ShipmentsTable.js';
import { makeStyles } from '@material-ui/core/styles';
import { CREATE_ANY, CREATE_OWN } from '../admin/utils/actions.js';
import ShipmentPermission from '../shared/permissions/ShipmentPermission.js';
import Box from '@material-ui/core/Box';
import SearchBar from 'features/shared/components/SearchBar.js';
import { useSelector } from 'react-redux';
import { selectAllShipments } from 'features/shipments/duck/selectors.js';
import { getShipmentURL } from 'features/shipments/utils/urls.js';
import { selectClientsMap } from 'features/clients/duck/selectors.js';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(2),
    },
    topRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(2)
    },
    button: {
        marginRight: theme.spacing(1)
    }
}));

const { newShipmentButtonLabel } = LANGUAGE.shipment.overview;

const ShipmentOverview = React.memo(function ShipmentOverview() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const shipments = useSelector(selectAllShipments);
    const clients = useSelector(selectClientsMap);

    const onNewOrderClick = () =>
        history.push(`${ location.pathname }/shell`);

    const getUrl = useCallback(shipment => getShipmentURL(shipment._id), []);

    const getOptionLabel = useCallback(
        shipment => `${ shipment.ref } - ${ clients[shipment.consignee]?.name }`,
        [clients]);

    return (
        <ShipmentPermission action={ [CREATE_ANY, CREATE_OWN] }>
            <Paper className={ classes.container }>
                <Box className={ classes.topRow }>
                    <ThemedButton onClick={ onNewOrderClick } className={classes.button}>
                        { newShipmentButtonLabel }
                    </ThemedButton>
                    <SearchBar
                        options={ shipments }
                        getOptionLabel={ getOptionLabel }
                        getOptionSelected={ (shipment, value) => shipment._id === value._id }
                        getUrl={ getUrl }
                    />
                </Box>
                <ShipmentsTable/>
            </Paper>
        </ShipmentPermission>
    );
});

export default ShipmentOverview;

