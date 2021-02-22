import React, { useEffect, useRef, useState } from 'react';
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
    const [errors, setErrors] = useState( Array.isArray(error) ? error.join(' ') : [error].join(' '))
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setErrors(Array.isArray(error) ? error.join(' ') : [error].join(' '));
    }, [error]);

    const prevError = useRef('');
    useEffect(() => {
        if (errors && errors !== prevError.current) {
            setOpen(true);
            prevError.current = errors;
        }
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
    ]).isRequired
};

export default ErrorSnackbar;