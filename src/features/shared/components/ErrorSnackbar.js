import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

const ANCHOR_ORIGIN = {
    vertical: 'top',
    horizontal: 'center'
};

const DURATION = 5000;

const ErrorSnackbar = React.memo(function ErrorSnackbar({ error = [] }) {
    const errors = Array.isArray(error) ? error : [error];
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (errors.length) setOpen(true);
    }, [errors]);

    const onClose = (event, reason) => {
        if (reason === "clickaway") return;
        setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={ ANCHOR_ORIGIN }
            TransitionComponent={ props => <Slide { ...props } direction="down"/> }
            open={ open }
            autoHideDuration={ DURATION }
            onClose={ onClose }
        >
            <Alert onClose={ onClose } severity="error">
                { errors }
            </Alert>
        </Snackbar>
    )
});

ErrorSnackbar.propTypes = {
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    className: PropTypes.string
};

export default ErrorSnackbar;