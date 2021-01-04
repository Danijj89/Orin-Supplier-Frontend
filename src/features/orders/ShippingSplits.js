import React from 'react';
import PropTypes from 'prop-types';
import ShippingSplit from 'features/orders/ShippingSplit.js';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2)
    }
}));

const ShippingSplits = React.memo(function ShippingSplits(
    { shippingSplits }) {
    const classes = useStyles();

    return (
        <Box className={ classes.container }>
            { shippingSplits && shippingSplits.map((split, idx) =>
                <ShippingSplit
                    key={ `shipping-plan-${ split.ref }` }
                    split={ split }
                    splitNum={ idx + 1 }
                />
            ) }
        </Box>
    );
});

ShippingSplits.propTypes = {
    shippingSplits: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ShippingSplits;