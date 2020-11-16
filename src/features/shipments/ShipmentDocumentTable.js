import React from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import FileService from '../api/FileService.js';
import { useParams } from 'react-router-dom';

const ShipmentDocumentTable = React.memo(function ShipmentDocumentTable() {
    const { id } = useParams();
    const onGenerateDoc = () => FileService.downloadCI(id, 'xlsx');
    return (
        <ThemedButton onClick={ onGenerateDoc }>Generate CI</ThemedButton>
    )
});

export default ShipmentDocumentTable;

