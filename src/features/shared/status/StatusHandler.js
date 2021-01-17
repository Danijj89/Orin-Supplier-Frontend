import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Backdrop from '@material-ui/core/Backdrop';
import Loader from 'features/shared/components/Loader.js';
import makeStyles from '@material-ui/core/styles/makeStyles.js';
import Slide from '@material-ui/core/Slide';
import { LANGUAGE } from 'app/utils/constants.js';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1
    }
}));

const {
    successMessage
} = LANGUAGE.shared.status.statusHandler;

function SlideTransition(props) {
    return <Slide { ...props } direction='down'/>
}

const ANCHOR_ORIGIN = {
    vertical: 'top',
    horizontal: 'center'
};

const DURATION = 5000;

const StatusHandler = React.memo(function StatusHandler({ status, error, showSuccess }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const showSuccessSnackBar = useMemo(() => showSuccess && status === 'FULFILLED',
        [showSuccess, status]);

    const onClose = (event, reason) => {
        if (reason === "clickaway") return;
        setOpen(false);
    };

    useEffect(() => {
        if (status === 'FULFILLED' || status === 'REJECTED' || status === 'PENDING') setOpen(true);
    }, [status]);

    return (
        <>
            { showSuccessSnackBar &&
            <Snackbar
                anchorOrigin={ ANCHOR_ORIGIN }
                TransitionComponent={ SlideTransition }
                open={ open }
                autoHideDuration={ DURATION }
                onClose={ onClose }
            >
                <Alert onClose={ onClose } severity="success">
                    { successMessage }
                </Alert>
            </Snackbar> }
            { status === 'REJECTED' &&
            <Snackbar
                anchorOrigin={ ANCHOR_ORIGIN }
                TransitionComponent={ SlideTransition }
                open={ open }
                autoHideDuration={ DURATION }
                onClose={ onClose }
            >
                <Alert onClose={ onClose } severity="error">
                    { error }
                </Alert>
            </Snackbar> }
            { status === 'PENDING' &&
            <Backdrop className={ classes.backdrop } open={ open }>
                <Loader/>
            </Backdrop> }
        </>
    );
});

StatusHandler.propTypes = {
    status: PropTypes.string.isRequired,
    error: PropTypes.string,
    showSuccess: PropTypes.bool
};

export default StatusHandler;