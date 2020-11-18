import React from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import DocumentService from '../api/DocumentService.js';
import { downloadFile } from '../shared/utils/file.js';

export default function OrderDocuments({ order }) {

    const onGenerateDoc = async () => {
        const file = await DocumentService.downloadOrder(order._id, 'xlsx');
        downloadFile(file, `${order.fileName}.xlsx`);
    }

    return (
        <ThemedButton
            onClick={ onGenerateDoc }
        >Generate Document</ThemedButton>
    )
}

