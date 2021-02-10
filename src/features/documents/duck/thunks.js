import { createAsyncThunk } from '@reduxjs/toolkit';
import DocumentService from '../../api/DocumentService.js';

function getFilenameFromHeader(header) {
    return header.split('=')[1];
}

export function downloadFile(file, filename) {
    const url = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
}

export const downloadShipmentDocument = createAsyncThunk('documents/downloadShipmentDocument',
    async ({ shipmentId, documentId, ext }, { rejectWithValue }) => {
        try {
            const { headers, data } = await DocumentService.downloadShipmentDocument(shipmentId, documentId, ext);
            downloadFile(data, getFilenameFromHeader(headers['content-disposition']));
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const downloadOrder = createAsyncThunk('documents/downloadOrder',
    async ({ orderId, ext, splitId, items }, { rejectWithValue }) => {
        try {
            const { headers, data } = await DocumentService.downloadOrder(orderId, ext, splitId, items);
            downloadFile(data, getFilenameFromHeader(headers['content-disposition']));
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });