import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { LANGUAGE } from '../../../app/utils/constants.js';

const { message, homeButtonLabel } = LANGUAGE.shared.components.notFound;

export default function NotFound() {

    return (
        <Box>
            <Typography variant="h1">{ message }</Typography>
            <Link to={ '/' }>{ homeButtonLabel }</Link>
        </Box>
    )
};