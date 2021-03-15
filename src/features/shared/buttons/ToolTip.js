import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import IconButton from '@material-ui/core/IconButton';


const ToolTip = React.memo(function ToolTip(
    {hint, variant = 'main', className}) {
    return (
        <Tooltip title={ hint } className={ className }>
            <IconButton aria-label="delete">
                <HelpOutlineIcon style={ {fontSize: 18} }/>
            </IconButton>
        </Tooltip>
    );
});

ToolTip.propTypes = {
    hint: PropTypes.string.isRequired,
};

export default ToolTip;
