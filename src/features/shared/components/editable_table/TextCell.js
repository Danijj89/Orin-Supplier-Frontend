import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { TableCell } from './EditableTable.js';

const TextCell = React.memo(function TextCell({ value, width, align }) {

    return (
        <TableCell align={ align } width={ width }>
            <Typography>
                { typeof value === 'number' ? value : (value || '-') }
            </Typography>
        </TableCell>
    )
});

TextCell.propTypes = {
    value: PropTypes.any,
    width: PropTypes.number,
    align: PropTypes.string
};

export default TextCell;