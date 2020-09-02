import React from 'react';
import { LANGUAGE } from '../../../constants.js';
import { Grid } from '@material-ui/core';
import DownloadButton from '../buttons/DownloadButton.js';
import { makeStyles } from '@material-ui/core/styles';
import Loader from './Loader.js';
import ThemedButton from '../buttons/ThemedButton.js';


const { prevButton, submitButton } = LANGUAGE.packingList.createPLPreview;

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '1vw 10vw'
    },
    row: {
        margin: theme.spacing(3)
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
    viewer: {
        margin: theme.spacing(1),
        height: '50vh'
    },
    fileViewer: {
        // margin: 'auto',
        width: '100%',
        height: '100%'
    },
    buttonBack: {
        width: '30%'
    },
    buttonSubmit: {
        width: '30%'
    }
}));

export default function DocumentPreview(
    { onPrevButtonClick, onSubmitButtonClick, previewFileUrl, status, error, fileName }) {
    const classes = useStyles();

    let preview;
    if (status === 'PENDING') {
        preview = <Loader />;
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
                className={classes.row}
                item
                justify="flex-end"
                xs={12}
            >
                <DownloadButton fileName={ fileName }/>
            </Grid>
            <Grid item xs={12} className={ classes.viewer }>
                { preview }
            </Grid>
            <Grid
                container
                className={classes.row}
                justify="space-around"
                item
                xs={12}
            >
                <ThemedButton
                    styles={classes.buttonBack}
                    variant="outlined"
                    onClick={ onPrevButtonClick }
                    text={prevButton}
                />
                <ThemedButton
                    styles={classes.buttonSubmit}
                    variant="contained"
                    onClick={ onSubmitButtonClick }
                    text={submitButton}
                />
            </Grid>
        </Grid>
    )
}