import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectNewOrderDetails, selectPreviewFile, selectStatus } from './duck/selectors.js';
import Button from '@material-ui/core/Button';
import { LANGUAGE } from '../../constants.js';
import { prevStep } from './duck/slice.js';
import { useHistory } from 'react-router-dom';
import { submitOrder } from './duck/thunks.js';
import { unwrapResult } from '@reduxjs/toolkit';
import OrderService from './services.js';
import { downloadFile } from '../shared/utils.js';

const { buttonProductInfo, buttonSubmit, buttonDownloadExcel, buttonDownloadPdf } = LANGUAGE.orderPreview;

export default function OrderPreview() {

    const dispatch = useDispatch();
    const history = useHistory();

    const previewFileUrl = useSelector(selectPreviewFile);
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const orderDetails = useSelector(selectNewOrderDetails);

    const onButtonProductInfoClick = () => {
        dispatch(prevStep());
    }

    const onSubmit = () => {
        dispatch(submitOrder())
            .then(unwrapResult)
            .then(_ => history.push('/home/orders'))
            .catch(err => console.log(err))
    }

    const onButtonExcelDownloadClick = async () => {
        const { orderNumber, createdBy, orderDate } = orderDetails;
        const file = await OrderService.downloadPO({
            orderNumber,
            createdBy,
            orderDate,
            fmt: 'xlsx'
        });
        const filename = `${orderNumber}_${createdBy}_${orderDate}.xlsx`;
        downloadFile(file, filename);
    }

    const onButtonPdfDownloadClick = async () => {
        const { orderNumber, createdBy, orderDate } = orderDetails;
        const file = await OrderService.downloadPO({
            orderNumber,
            createdBy,
            orderDate,
            fmt: 'pdf'
        });
        const filename = `${orderNumber}_${createdBy}_${orderDate}.pdf`;
        downloadFile(file, filename);
    }

    let preview;
    if (status === 'PENDING') {
        preview = <div className="order-preview-loader"><div className="loader" /></div>;
    } else if (status === 'IDLE') {
        preview = <iframe title="Order Preview" src={previewFileUrl} />
    } else if (status === 'REJECTED') {
        preview = <div>{error}</div>
    }

    return (
        <div className="order-preview">
            <div className="order-preview-download">
                <Button variant="contained" onClick={onButtonExcelDownloadClick}>{buttonDownloadExcel}</Button>
                <Button variant="contained" onClick={onButtonPdfDownloadClick}>{buttonDownloadPdf}</Button>
            </div>
            {preview}
            <div className="d-flex justify-content-around m-4">
                <Button variant="outlined" onClick={onButtonProductInfoClick}>{buttonProductInfo}</Button>
                <Button variant="contained" onClick={onSubmit}>{buttonSubmit}</Button>
            </div>
        </div>
    )
}