import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const Title1 = React.memo(function Title1({ title, className }) {

    return (
        <Typography className={ className } variant="h5">
            { title }
        </Typography>
    );
});

Title1.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default Title1;