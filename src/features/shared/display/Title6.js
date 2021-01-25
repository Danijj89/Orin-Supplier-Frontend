import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const Title6 = React.memo(function Title6({ title, className }) {

    return (
        <Typography className={ className } variant="h6">
            { title }
        </Typography>
    );
});

Title6.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default Title6;