import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { dateToLocaleDate, formatQuantityWithUnit } from 'features/shared/utils/format.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Table from 'features/shared/components/table/Table.js';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        backgroundColor: theme.palette.backgroundSecondary.main
    },
    left: {
        minWidth: 140,
        minHeight: 140,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: theme.spacing(4)
    },
    right: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        padding: theme.spacing(2)
    },
    table: {
        backgroundColor: theme.palette.backgroundPrimary.main
    }
}))

const {
    labels,
    tableHeaderLabels
} = LANGUAGE.order.order.shippingPlan.shippingSplits;

const ShippingSplit = React.memo(function ShippingSplit(
    { split, splitNum }) {
    const classes = useStyles();
    const { ref, crd, items } = split;

    const columns = useMemo(() => [
        { field: 'ref', headerName: tableHeaderLabels.ref },
        { field: 'description', headerName: tableHeaderLabels.description },
        {
            field: 'quantity',
            headerName: tableHeaderLabels.quantity,
            format: row => formatQuantityWithUnit(row.quantity, row.unit)
        },
        {
            field: 'price',
            headerName: tableHeaderLabels.price,
            type: 'number'
        },
        { field: 'total', headerName: tableHeaderLabels.total }
    ], []);

    const rows = useMemo(() => items.map(item => ({
        ref: item.ref,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price,
        total: item.total
    })), [items]);

    const options = useMemo(() => ({
        table: {
            classes: {
                container: classes.right,
                table: classes.table
            }
        }
    }), [classes.table, classes.right]);

    return (
        <>
            <Typography>{ ref }</Typography>
            <Box className={ classes.container }>
                <Box className={ classes.left }>
                    <Avatar>{ splitNum }</Avatar>
                    <Typography>{ labels.crd }</Typography>
                    { crd
                        ? <Typography>{ dateToLocaleDate(crd) }</Typography>
                        : <Typography>{ labels.noCrd }</Typography>
                    }
                </Box>
                <Table
                    rows={ rows }
                    columns={ columns }
                    options={ options }
                />
            </Box>
        </>
    );
});

ShippingSplit.propTypes = {
    split: PropTypes.object.isRequired
};

export default ShippingSplit;