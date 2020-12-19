import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import ShipmentsTable from './ShipmentsTable.js';
import { makeStyles } from '@material-ui/core/styles';
import Permission from '../shared/components/Permission.js';
import { SHIPMENT } from '../admin/utils/resources.js';
import { CREATE_ANY } from '../admin/utils/actions.js';

const useStyles = makeStyles((theme) => ({
    shipmentOverviewRoot: {
        margin: theme.spacing(2),
    },
    newShipmentButton: {
        margin: theme.spacing(2),
    }
}));

const { newShipmentButtonLabel } = LANGUAGE.shipment.overview;

const ShipmentOverview = React.memo(function ShipmentOverview() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const onNewOrderClick = () =>
        history.push(`${ location.pathname }/shell`);


    return (
        <Paper className={ classes.shipmentOverviewRoot }>
            <Permission resource={ SHIPMENT } action={ [CREATE_ANY] }>
                <ThemedButton
                    onClick={ onNewOrderClick }
                    className={ classes.newShipmentButton }
                >
                    { newShipmentButtonLabel }
                </ThemedButton>
            </Permission>
            <ShipmentsTable/>
        </Paper>
    )
});

export default ShipmentOverview;

