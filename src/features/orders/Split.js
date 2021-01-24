import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import NavTabs from 'features/shared/components/NavTabs.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import OrderProductTable from 'features/orders/OrderProductTable.js';
import SplitInfo from 'features/orders/SplitInfo.js';
import { makeStyles } from '@material-ui/core/styles';
import Title6 from 'features/shared/display/Title6.js';

const {
    subTabsLabels,
    labels
} = LANGUAGE.order.order;

const useStyles = makeStyles((theme) => ({
    navTabs: {
        marginBottom: theme.spacing(3)
    },
}));

const Split = React.memo(function Split({ orderId, split, currency, custom1, custom2 }) {
    const { clientRef = '-', items, quantity, total } = split;
    const history = useHistory();
    const location = useLocation();
    const parsed = queryString.parse(location.search);
    const { subTab = 'products' } = parsed;
    const classes = useStyles();

    const setTabValue = useCallback(newValue => {
        parsed.subTab = newValue;
        history.push(`${ location.pathname }?${ queryString.stringify(parsed) }`)
    }, [history, location.pathname, parsed]);

    const clientRefTitle = useMemo(() => `${ labels.clientRef }: ${ clientRef }`, [clientRef]);

    return (
        <>
            <NavTabs
                tabsLabelsMap={ subTabsLabels }
                tabValue={ subTab }
                onChange={ setTabValue }
                className={ classes.navTabs }
            />
            { subTab === 'products' &&
            <>
                <Title6 title={ clientRefTitle }/>
                <OrderProductTable
                    items={ items }
                    currency={ currency }
                    quantity={ quantity }
                    total={ total }
                    custom1={ custom1 }
                    custom2={ custom2 }
                />
            </>
            }
            { subTab === 'status' &&
            <SplitInfo orderId={ orderId } split={ split }/>
            }
        </>
    );
});

Split.propTypes = {
    orderId: PropTypes.string.isRequired,
    split: PropTypes.object.isRequired,
    currency: PropTypes.object.isRequired,
    custom1: PropTypes.string,
    custom2: PropTypes.string
};

export default Split;