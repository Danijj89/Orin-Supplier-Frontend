import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import EditTableCell from 'features/shared/components/table/cells/EditTableCell.js';


const TextCell = React.memo(function TextCell({ value, width, align }) {
    return (
        <EditTableCell align={ align } width={ width }>
            <Typography>
                { typeof value === 'number' ? value : (value || '-') }
            </Typography>
        </EditTableCell>
    )
});

TextCell.propTypes = {
    value: PropTypes.any,
    width: PropTypes.number,
    align: PropTypes.string
};

export default TextCell;