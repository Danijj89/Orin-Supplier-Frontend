import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import NavTabs from 'features/shared/components/NavTabs.js';
import { LANGUAGE, LOCALE } from 'app/utils/constants.js';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import OrderProductTable from 'features/orders/OrderProductTable.js';
import SplitInfo from 'features/orders/SplitInfo.js';
import { makeStyles } from '@material-ui/core/styles';
import Title7 from 'features/shared/display/Title7.js';
import { dateToLocaleDate } from 'features/shared/utils/format.js';
import Box from '@material-ui/core/Box';
import SplitDocuments from 'features/orders/SplitDocuments.js';

const {
    subTabsLabels,
    labels
} = LANGUAGE.order.order;

const useStyles = makeStyles((theme) => ({
    navTabs: {
        marginBottom: theme.spacing(3)
    },
    info: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const Split = React.memo(function Split({ orderId, split, currency, custom1, custom2 }) {
    const { _id: splitId, clientRef = '-', crd, items, quantity, total } = split;
    const history = useHistory();
    const location = useLocation();
    const parsed = queryString.parse(location.search);
    const { subTab = 'products' } = parsed;
    const classes = useStyles();

    const setTabValue = useCallback(newValue => {
        parsed.subTab = newValue;
        history.push(`${ location.pathname }?${ queryString.stringify(parsed) }`)
    }, [history, location.pathname, parsed]);

    const clientRefInfo = useMemo(() => `${ labels.clientRef }: ${ clientRef }`, [clientRef]);
    const crdInfo = useMemo(() => `${ labels.crd }: ${ dateToLocaleDate(crd, LOCALE) }`, [crd]);

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
                <Box className={ classes.info }>
                    <Title7 title={ clientRefInfo }/>
                    <Title7 title={ crdInfo }/>
                </Box>
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
            { subTab === 'documents' &&
            <SplitDocuments orderId={ orderId } splitId={ splitId }/>
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