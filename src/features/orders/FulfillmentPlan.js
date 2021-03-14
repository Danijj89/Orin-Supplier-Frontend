import React, { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Grid from '@material-ui/core/Grid';
import SplitTabs from 'features/orders/SplitTabs.js';
import Split from 'features/orders/Split.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingRight: theme.spacing(4),
        minHeight: '40vh'
    },
    split: {
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1),
        },
    }
}));

const FulfillmentPlan = React.memo(function FulfillmentPlan({ order }) {
    const { _id: orderId, shippingSplits, currency, custom1, custom2 } = order;
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const parsed = queryString.parse(location.search);
    const { split: splitId = shippingSplits[0]._id } = parsed;
    const activeSplit = useMemo(
        () => shippingSplits.find(split => split._id === splitId),
        [shippingSplits, splitId]);

    const onSplitChange = useCallback((e, splitId) => {
        parsed.split = splitId;
        history.push(`${ location.pathname }?${ queryString.stringify(parsed) }`)
    }, [history, location.pathname, parsed]);

    return (
        <Grid container className={ classes.container }>
            <Grid container item xs={ 12 } sm={3}>
                <SplitTabs
                    splits={ shippingSplits }
                    activeSplit={ activeSplit }
                    onSplitChange={ onSplitChange }
                />
            </Grid>
            <Grid item xs={ 12 } sm={9} className={classes.split}>
                <Split
                    orderId={ orderId }
                    split={ activeSplit }
                    currency={ currency }
                    custom1={ custom1 }
                    custom2={ custom2 }
                />
            </Grid>
        </Grid>
    );
});

FulfillmentPlan.propTypes = {};

export default FulfillmentPlan;