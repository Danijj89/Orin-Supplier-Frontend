import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import NavTabs from 'features/shared/components/NavTabs.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import OrderProductTable from 'features/orders/OrderProductTable.js';

const {
    subTabsLabels
} = LANGUAGE.order.order;

const Split = React.memo(function Split({ split, currency, custom1, custom2 }) {
    const { items, quantity, total } = split;
    const history = useHistory();
    const location = useLocation();
    const parsed = queryString.parse(location.search);
    const { subTab = 'products' } = parsed;

    const setTabValue = useCallback(newValue => {
        parsed.subTab = newValue;
        history.push(`${ location.pathname }?${ queryString.stringify(parsed) }`)
    }, [history, location.pathname, parsed]);

    return (
        <>
            <NavTabs
                tabsLabelsMap={ subTabsLabels }
                tabValue={ subTab }
                onChange={ setTabValue }
            />
            { subTab === 'products' &&
            <OrderProductTable
                items={ items }
                currency={ currency }
                quantity={ quantity }
                total={ total }
                custom1={ custom1 }
                custom2={ custom2 }
            />
            }
        </>
    );
});

Split.propTypes = {
    split: PropTypes.object.isRequired
};

export default Split;