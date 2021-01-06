import React from 'react';
import PropTypes from 'prop-types';
import { Delete as IconDelete } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const DeleteIconButton = React.memo(function DeleteIconButton({ onClick, disabled }) {
    return (
        <IconButton size="small" onClick={ onClick } disabled={ disabled }>
            <IconDelete/>
        </IconButton>
    )
});

DeleteIconButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

export default DeleteIconButton;