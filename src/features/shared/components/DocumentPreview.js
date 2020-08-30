import React from 'react';
import { LANGUAGE } from '../../../constants.js';
import { Grid, Button } from '@material-ui/core';
import DownloadButton from '../buttons/DownloadButton.js';
import { makeStyles } from '@material-ui/core/styles';


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

export default function DocumentPreview(
    { onPrevButtonClick, onSubmitButtonClick, previewFileUrl, status, error, fileName }) {
    const classes = useStyles();

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
                    onClick={ onSubmitButtonClick }
                >{ submitButton }</Button>
            </Grid>
        </Grid>
    )
}