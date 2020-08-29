import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import DownloadButton from '../shared/buttons/DownloadButton.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectNewPL, selectPLError, selectPLPreviewFile, selectPLStatus } from './duck/selectors.js';
import { useHistory } from 'react-router-dom';
import { LANGUAGE } from '../../constants.js';
import { submitPL } from './duck/thunks.js';
import { startNewPL } from './duck/slice.js';
import { selectSelectedOrder } from '../orders/duck/selectors.js';

const { prevButton, submitButton } = LANGUAGE.packingList.createPLPreview;

const useStyles = makeStyles({
    container: {
        padding: '1vw 10vw'
    },
    downloadRow: {
        margin: '1%'
    },
    loader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        width: '100%',
        minWidth: 750,
        height: 400
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

export default function CreatePLPreview({ setActiveStep }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const order = useSelector(selectSelectedOrder);
    const previewFileUrl = useSelector(selectPLPreviewFile);
    const status = useSelector(selectPLStatus);
    const error = useSelector(selectPLError);
    const { fileName } = useSelector(selectNewPL);

    const onPrevButtonClick = () => {
        setActiveStep(prevStep => prevStep - 1);
    }

    const onSubmit = () => {
        dispatch(submitPL());
        dispatch(startNewPL());
        history.push(`/home/orders/${order._id}`);
    }

    let preview;
    if (status === 'PENDING') {
        preview = <div className={classes.loader}>
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
                    onClick={ onPrevButtonClick }
                >{ prevButton }</Button>
                <Button
                    className={classes.button}
                    variant="contained"
                    onClick={ onSubmit }
                >{ submitButton }</Button>
            </Grid>
        </Grid>
    )
}