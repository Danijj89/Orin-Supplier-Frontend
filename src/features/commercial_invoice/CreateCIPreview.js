import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import DownloadButton from '../shared/buttons/DownloadButton.js';
import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { selectCIError, selectCIFilePreview, selectCIStatus, selectNewCI } from './duck/selectors.js';
import { prevStep } from './duck/slice.js';
import { LANGUAGE } from '../../constants.js';
import { makeStyles } from '@material-ui/core/styles';

const { buttonPrev, buttonNext } = LANGUAGE.commercialInvoice.createCIPreview;

const useStyles = makeStyles({
    container: {
        padding: '1vw 10vw'
    },
    downloadRow: {
        margin: '1%'
    },
    fileViewer: {
        margin: 'auto',
        width: '100%',
        // minWidth: '400',
        maxHeight: 480,
        height: '60vh'
    },
    buttonsRow: {
        margin: '5%'
    },
    button: {
        minWidth: '15vw'
    }
})

export default function CreateCIPreview() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const previewFileUrl = useSelector(selectCIFilePreview);
    const status = useSelector(selectCIStatus);
    const error = useSelector(selectCIError);
    const { fileName } = useSelector(selectNewCI);

    const onButtonProductInfoClick = () => {
        dispatch(prevStep());
    }

    const onSubmit = () => {
        // dispatch(submitOrder())
        //     .then(unwrapResult)
        //     .then(_ => history.push('/home/orders'))
        //     .catch(err => console.log(err))
    }

    let preview;
    if (status === 'PENDING') {
        preview = <div className="order-preview-loader">
            <div className="loader"/>
        </div>;
    } else if (status === 'IDLE') {
        preview = <iframe className={classes.fileViewer} title="Order Preview" src={previewFileUrl}/>
    } else if (status === 'REJECTED') {
        preview = <div>{ error }</div>
    }

    return (
        <Grid
            container
            className={ classes.container }
        >
            <Grid
                container
                className={classes.downloadRow}
                item
                justify="flex-end"
                xs={12}
            >
                <DownloadButton fileName={ fileName }/>
            </Grid>
            <Grid item xs={12}>
                { preview }
            </Grid>
            <Grid
                container
                className={classes.buttonsRow}
                justify="space-around"
                item
                xs={12}
            >
                <Button
                    className={classes.button}
                    variant="outlined"
                    onClick={ onButtonProductInfoClick }
                >{ buttonPrev }</Button>
                <Button
                    className={classes.button}
                    variant="contained"
                    onClick={ onSubmit }
                >{ buttonNext }</Button>
            </Grid>
        </Grid>
    )
}