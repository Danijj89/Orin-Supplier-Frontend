import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Table from 'features/shared/components/table/Table.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectShipmentDocuments } from 'features/shipments/duck/selectors.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { GetApp as IconDownload } from '@material-ui/icons';
import { selectUsersMap } from 'features/home/duck/users/selectors.js';
import { downloadShipmentDocument } from 'features/documents/duck/thunks.js';
import DeleteButton from 'features/shared/buttons/DeleteButton.js';
import { deleteDocument } from 'features/shipments/duck/thunks.js';
import { CREATE_ANY, CREATE_OWN, DELETE_ANY, DELETE_OWN, READ_ANY, READ_OWN } from 'features/admin/utils/actions.js';
import ShipmentPermission from 'features/shared/permissions/ShipmentPermission.js';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import Drawer from '@material-ui/core/Drawer';
import DocumentPreview from 'features/shipments/DocumentPreview.js';
import InfoCard from 'features/shared/wrappers/InfoCard.js';
import { getDocumentUrl } from 'features/documents/utils/urls.js';
import { getOptionId } from 'app/utils/options/getters.js';

const {
    documentTableHeaders,
    messages,
    buttons
} = LANGUAGE.shipment.shipment;

const ShipmentDocumentTable = React.memo(function ShipmentDocumentTable(
    { shipmentId, maxEmptyRows, className }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const documents = useSelector(state => selectShipmentDocuments(state, { shipmentId }));
    const usersMap = useSelector(selectUsersMap);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerData, setDrawerData] = useState(null);

    const onCloseDrawer = useCallback(() => setIsDrawerOpen(false), []);

    const onEditDocument = useCallback(
        () => history.push(getDocumentUrl(getOptionId(drawerData.type), shipmentId, { document: drawerData._id })),
        [history, shipmentId, drawerData]);

    const onRowClick = useCallback(row => {
        setDrawerData(documents.find(doc => doc._id === row.id));
        setIsDrawerOpen(true);
    }, [documents]);

    const onDownload = useCallback(
        (documentId, ext) => dispatch(downloadShipmentDocument({ shipmentId, documentId, ext })),
        [dispatch, shipmentId]);

    const createDeleteHandler = useCallback(
        (documentId) => () => dispatch(deleteDocument({ shipmentId, documentId })),
        [dispatch, shipmentId]);

    const columns = useMemo(() => [
        {
            field: 'delete',
            renderCell: params =>
                <ShipmentPermission
                    action={ [DELETE_ANY, DELETE_OWN] }
                    shipmentId={ shipmentId }
                >
                    <DeleteButton
                        onDelete={ createDeleteHandler(params.id) }
                        deleteMessage={ messages.documentDeleteMessage }
                        variant="icon"
                    />
                </ShipmentPermission>
        },
        { field: 'ref', headerName: documentTableHeaders.ref },
        { field: 'type', headerName: documentTableHeaders.type, type: 'option' },
        { field: 'createdAt', headerName: documentTableHeaders.createdAt, type: 'datetime' },
        { field: 'createdBy', headerName: documentTableHeaders.createdBy },
        {
            field: 'excel',
            headerName: documentTableHeaders.excel,
            renderCell: (params) =>
                <ThemedButton
                    onClick={ () => onDownload(params.id, 'xlsx') }
                    variant="text"
                >
                    <IconDownload/>
                </ThemedButton>,
            align: 'center',
            width: 50
        },
        {
            field: 'pdf',
            headerName: documentTableHeaders.pdf,
            renderCell: (params) =>
                <ThemedButton
                    onClick={ () => onDownload(params.id, 'pdf') }
                    variant="text"
                >
                    <IconDownload/>
                </ThemedButton>,
            align: 'center',
            width: 50
        }
    ], [onDownload, createDeleteHandler, shipmentId]);

    const rows = useMemo(() => documents.map(doc => ({
        id: doc._id,
        ref: doc.ref,
        type: doc.type,
        createdAt: doc.createdAt,
        createdBy: usersMap[doc.createdBy]?.name,
        fileName: doc.fileName
    })), [documents, usersMap]);

    const options = useMemo(() => ({
        table: {
            dense: true,
            classes: {
                container: className
            }
        },
        head: {
            sort: false
        },
        body: {
            maxEmptyRows,
            onRowClick
        },
        foot: {
            pagination: 'hide'
        }
    }), [maxEmptyRows, className, onRowClick]);

    return (
        <ShipmentPermission
            action={ [READ_ANY, READ_OWN] }
            shipmentId={ shipmentId }
        >
            <Table
                rows={ rows }
                columns={ columns }
                options={ options }
            />
            <Drawer
                anchor={ 'right' }
                open={ isDrawerOpen }
                onClose={ onCloseDrawer }
                transitionDuration={ 500 }
            >
                { drawerData &&
                <InfoCard
                    title={ drawerData.ref }
                    tools={
                        <ShipmentPermission
                            action={ [CREATE_ANY, CREATE_OWN] }
                            shipmentId={ shipmentId }
                        >
                            <ThemedButton onClick={ onEditDocument }>
                                { buttons.editDocument }
                            </ThemedButton>
                        </ShipmentPermission>
                    }
                    content={
                        <DocumentPreview document={ drawerData }/>
                    }
                />
                }
            </Drawer>
        </ShipmentPermission>
    );
});

ShipmentDocumentTable.propTypes = {
    shipmentId: PropTypes.string.isRequired,
    maxEmptyRows: PropTypes.number,
    className: PropTypes.string
};

export default ShipmentDocumentTable;

