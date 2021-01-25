import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const Title5 = React.memo(function Title5({ title, className }) {

    return (
        <Typography className={ className } variant="h5">
            { title }
        </Typography>
    );
});

Title5.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default Title5;