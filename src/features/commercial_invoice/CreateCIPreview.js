import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectError, selectNewOrderDetails, selectPreviewFile, selectStatus } from '../orders/duck/selectors.js';
import { prevStep } from '../orders/duck/slice.js';
import { submitOrder } from '../orders/duck/thunks.js';
import { unwrapResult } from '@reduxjs/toolkit';
import DownloadButton from '../shared/buttons/DownloadButton.js';
import Button from '@material-ui/core/Button';
import React from 'react';


export default function CreateCIPreview() {

    const dispatch = useDispatch();
    const history = useHistory();

    // const previewFileUrl = useSelector(selectPreviewFile);
    // const status = useSelector(selectStatus);
    // const error = useSelector(selectError);
    // const orderDetails = useSelector(selectNewOrderDetails);
    //
    // const onButtonProductInfoClick = () => {
    //     dispatch(prevStep());
    // }
    //
    // const onSubmit = () => {
    //     dispatch(submitOrder())
    //         .then(unwrapResult)
    //         .then(_ => history.push('/home/orders'))
    //         .catch(err => console.log(err))
    // }
    //
    // let preview;
    // if (status === 'PENDING') {
    //     preview = <div className="order-preview-loader"><div className="loader" /></div>;
    // } else if (status === 'IDLE') {
    //     preview = <iframe title="Order Preview" src={previewFileUrl} />
    // } else if (status === 'REJECTED') {
    //     preview = <div>{error}</div>
    // }

    return (
        <div className="order-preview">
            {/*<div className="order-preview-download">*/}
            {/*    <DownloadButton fileName={orderDetails.fileName} />*/}
            {/*</div>*/}
            {/*{preview}*/}
            {/*<div className="d-flex justify-content-around m-4">*/}
            {/*    <Button variant="outlined" onClick={onButtonProductInfoClick}>{buttonProductInfo}</Button>*/}
            {/*    <Button variant="contained" onClick={onSubmit}>{buttonSubmit}</Button>*/}
            {/*</div>*/}
        </div>
    )
}