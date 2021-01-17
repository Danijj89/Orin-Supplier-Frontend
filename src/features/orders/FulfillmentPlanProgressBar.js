import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import InfoCard from 'features/shared/wrappers/InfoCard.js';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Table from 'features/shared/components/table/Table.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { formatQuantityWithUnit } from 'features/shared/utils/format.js';

const useStyles = makeStyles(theme => ({
    progressBarContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    progressBar: {
        width: 280,
        marginRight: theme.spacing(1)
    },
    red: {
        color: theme.palette.danger.main
    },
    green: {
        color: theme.palette.success.main
    },
    tableContainer: {
        minWidth: '40vw',
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    }
}));

const {
    tableHeaderLabels
} = LANGUAGE.order.order.editFulfillmentPlan;

const FulfillmentPlanProgressBar = React.memo(function FulfillmentPlanProgressBar(
    { progress, orderRef, items, allocationMap, custom1, custom2 }) {
    const classes = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const onClick = useCallback(() => setIsDrawerOpen(true), []);
    const onCloseDrawer = useCallback(() => setIsDrawerOpen(false), []);

    const columns = useMemo(() => [
        { field: 'ref', headerName: tableHeaderLabels.ref },
        { field: 'description', headerName: tableHeaderLabels.description },
        { field: 'custom1', headerName: custom1, hide: !custom1 },
        { field: 'custom2', headerName: custom2, hide: !custom2 },
        {
            field: 'quantity',
            headerName: tableHeaderLabels.quantity,
            type: 'number',
            align: 'right',
            format: row => formatQuantityWithUnit(row.quantity, row.unit)
        },
        {
            field: 'allocated',
            headerName: tableHeaderLabels.allocated,
            renderCell: row =>
                <Typography
                    variant="subtitle2"
                    className={ clsx(row.quantity === row.allocated ? classes.green : classes.red) }
                >
                    { formatQuantityWithUnit(row.allocated, row.unit) }
                </Typography>,
            align: 'right',
        }
    ], [custom1, custom2, classes.red, classes.green]);

    const rows = useMemo(() => items.map(item => ({
        ref: item.ref,
        description: item.description,
        custom1: item.custom1,
        custom2: item.custom2,
        quantity: item.quantity,
        allocated: allocationMap[item._id].allocated,
        unit: item.unit
    })), [items, allocationMap]);

    const options = useMemo(() => ({
        table: {
            classes: {
                container: classes.tableContainer
            }
        },
        foot: {
            pagination: 'none'
        }
    }), [classes.tableContainer]);

    return (
        <>
            <ThemedButton
                className={ clsx(
                    classes.progressBarContainer,
                    progress !== 100 && classes.red,
                    progress === 100 && classes.green
                ) }
                variant="text"
                onClick={ onClick }
            >
                <LinearProgress className={ classes.progressBar } variant="determinate" value={ progress }/>
                <Typography>{ `${ progress }%` }</Typography>
            </ThemedButton>
            <Drawer
                anchor={ 'right' }
                open={ isDrawerOpen }
                onClose={ onCloseDrawer }
                transitionDuration={ 500 }
            >
                <InfoCard
                    title={ orderRef }
                    content={
                        <Table
                            columns={ columns }
                            rows={ rows }
                            options={ options }
                        />
                    }
                />
            </Drawer>
        </>
    );
});

FulfillmentPlanProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
    orderRef: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    allocationMap: PropTypes.object.isRequired,
    custom1: PropTypes.string,
    custom2: PropTypes.string
};

export default FulfillmentPlanProgressBar;