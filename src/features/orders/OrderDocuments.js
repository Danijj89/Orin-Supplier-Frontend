import React from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import FileService from '../api/FileService.js';

export default function OrderDocuments({ order }) {

    const onGenerateDoc = () => FileService.downloadOrder(order._id, 'xlsx');

    return (
        <ThemedButton
            onClick={ onGenerateDoc }
        >Generate Document</ThemedButton>
    )
}

