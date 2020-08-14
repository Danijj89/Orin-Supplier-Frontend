import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    FormControl,
    MenuItem,
    Select
} from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import { makeStyles } from '@material-ui/core/styles';
import SharedService from './services.js';
import { downloadFile } from './utils.js';

const { buttonText, dialogTitle, dialogCancel, dialogConfirm } = LANGUAGE.shared.downloadButton;
const downloadChoices = ['PDF', 'Excel'];
const extensions = ['.pdf', '.xlsx'];

const useStyles = makeStyles({
    select: {
        margin: '5%'
    }
})

export default function DownloadButton({ styles, fileName }) {
    const classes = useStyles();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [downloadChoice, setDownloadChoice] = useState(extensions[0]);

    const onDialogOpen = () => setIsDialogOpen(true);
    const onDialogClose = () => setIsDialogOpen(false);
    const onDownloadChoiceChange = (event) => setDownloadChoice(event.target.value);

    const handleDownload = async (extension) => {
        const fileNameWithExtension = fileName + extension;
        const file = await SharedService.downloadFile(fileNameWithExtension);
        downloadFile(file, fileNameWithExtension);
    }

    return (
        <>
            <Button
                className={styles}
                variant="contained"
                onClick={onDialogOpen}
            >{buttonText}</Button>
            <Dialog onClose={onDialogClose} open={isDialogOpen}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <FormControl variant="outlined">
                    <Select
                        value={downloadChoice}
                        onChange={onDownloadChoiceChange}
                        label={downloadChoices[0]}
                        className={classes.select}
                    >
                        {downloadChoices.map((choice, index) =>
                            <MenuItem key={choice} value={extensions[index]}>{choice}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <DialogActions>
                    <Button onClick={onDialogClose} color="primary" variant="outlined">
                        {dialogCancel}
                    </Button>
                    <Button onClick={() => handleDownload(downloadChoice)} color="primary" variant="outlined">
                        {dialogConfirm}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}