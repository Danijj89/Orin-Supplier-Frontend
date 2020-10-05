// import React, { useState } from 'react';
// import {
//     Dialog,
//     DialogActions,
//     DialogTitle,
//     FormControl,
//     MenuItem,
//     Select,
//     InputLabel
// } from '@material-ui/core';
// import { GetApp as IconGetApp } from '@material-ui/icons';
// import { LANGUAGE } from '../../../constants.js';
// import { makeStyles } from '@material-ui/core/styles';
// import SharedService from '../services.js';
// import { downloadFile } from '../utils.js';
// import ThemedButton from './ThemedButton.js';
//
// const { buttonText, dialogTitle, dialogCancel, dialogConfirm, typeLabel } = LANGUAGE.shared.downloadButton;
// const downloadChoices = ['PDF', 'Excel'];
// const extensions = ['.pdf', '.xlsx'];
//
// const useStyles = makeStyles((theme) => ({
//     formControl: {
//         margin: theme.spacing(1)
//     },
//     buttons: {
//         display: 'flex',
//         justifyContent: 'space-around'
//     }
// }));
//
// export default function DownloadButton({ styles, fileName, icon }) {
//     const classes = useStyles();
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [extension, setExtension] = useState(extensions[0]);
//
//     const onDialogOpen = () => setIsDialogOpen(true);
//     const onDialogClose = () => setIsDialogOpen(false);
//     const onDownloadChoiceChange = (event) => setExtension(event.target.value);
//
//     const handleDownload = async () => {
//         const fileNameWithExtension = fileName + extension;
//         const file = await SharedService.downloadFile(fileNameWithExtension);
//         downloadFile(file, fileNameWithExtension);
//     }
//
//     return (
//         <>
//             <ThemedButton
//                 styles={styles}
//                 variant={ icon ? "text" : "contained" }
//                 onClick={onDialogOpen}
//                 text={icon ? <IconGetApp /> : buttonText}
//             />
//             <Dialog onClose={onDialogClose} open={isDialogOpen}>
//                 <DialogTitle>{dialogTitle}</DialogTitle>
//                 <FormControl variant="outlined" className={classes.formControl} color="primary">
//                     <InputLabel id="download-button-select-label">{typeLabel}</InputLabel>
//                     <Select
//                         labelId="download-button-select-label"
//                         value={extension}
//                         onChange={onDownloadChoiceChange}
//                         label={typeLabel}
//                     >
//                         {downloadChoices.map((choice, index) =>
//                             <MenuItem key={choice} value={extensions[index]}>{choice}</MenuItem>
//                         )}
//                     </Select>
//                 </FormControl>
//                 <DialogActions className={classes.buttons}>
//                     <ThemedButton
//                         onClick={onDialogClose}
//                         variant="outlined"
//                         text={dialogCancel}
//                     />
//                     <ThemedButton
//                         onClick={handleDownload}
//                         variant="outlined"
//                         text={dialogConfirm}
//                     />
//                 </DialogActions>
//             </Dialog>
//         </>
//     )
// }