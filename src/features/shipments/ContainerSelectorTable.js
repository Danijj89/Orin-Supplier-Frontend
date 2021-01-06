import React, { useCallback, useMemo } from 'react';
import { LANGUAGE, LOCALE } from 'app/utils/constants.js';
import { useSelector } from 'react-redux';
import { selectContainerTypes, selectDefaultContainerRowItem } from 'app/duck/selectors.js';
import { getOptionLabel } from 'app/utils/options/getters.js';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIconButton from '../shared/buttons/DeleteIconButton.js';
import Table from 'features/shared/components/table/Table.js';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 400,
        minHeight: 400
    }
}));

const {
    tableHeaders
} = LANGUAGE.shipment.editShipment.shipmentInfo.containerSelectorButton.containerSelectorTable;

const ContainerSelectorTable = React.memo(function ContainerSelectorTable(
    { containers, setContainers, className }) {
    const classes = useStyles();
    const containerTypeOptions = useSelector(selectContainerTypes);
    const defaultContainerRowItem = useSelector(selectDefaultContainerRowItem);

    const onAddRow = useCallback(
        () => setContainers([...containers, defaultContainerRowItem]),
        [defaultContainerRowItem, containers, setContainers]);

    const onDeleteRow = useCallback(
        idx => () => setContainers(containers.filter((_, i) => i !== idx)),
        [setContainers, containers]);

    const onCellChange = useCallback(
        (rowIdx, key, newValue) => setContainers(oldContainers => {
            const newContainer = { ...oldContainers[rowIdx] };
            if (key === 'type') {
                if (newValue.id) newContainer.type = newValue.id;
                else newContainer.type = newValue;
            } else {
                newContainer.quantity = newValue;
            }
            return [
                ...oldContainers.slice(0, rowIdx),
                newContainer,
                ...oldContainers.slice(rowIdx + 1)
            ]
        }),
        [setContainers]);

    const columns = useMemo(() => [
        {
            field: 'delete',
            renderCell: params =>
                <DeleteIconButton onClick={ onDeleteRow(params.idx) }/>,
            width: 50,
            align: 'center'
        },
        {
            field: 'type',
            headerName: tableHeaders.type,
            type: 'autocomplete',
            options: containerTypeOptions,
            getOptionLabel: type => typeof type === 'string'
                ? type
                : getOptionLabel(type, LOCALE)
        },
        {
            field: 'quantity',
            headerName: tableHeaders.quantity,
            type: 'number',
            width: 50
        }
    ], [containerTypeOptions, onDeleteRow]);

    const rows = useMemo(() => containers.map((container, idx) => ({
        idx: idx,
        type: container.type,
        quantity: container.quantity
    })), [containers]);

    const options = useMemo(() => ({
        table: {
            isEdit: true,
            classes: {
                container: classes.root
            }
        },
        body: {
            onAddRow: onAddRow,
            onCellChange: onCellChange
        },
        foot: {
            pagination: false
        }
    }), [onAddRow, onCellChange, classes.root]);

    return (
        <Table
            columns={columns}
            rows={rows}
            options={options}
        />
    )
});



export default ContainerSelectorTable;