import React from 'react';
import PropTypes from 'prop-types';
import ThemedButton from '../../buttons/ThemedButton.js';
import { TableRow } from '@material-ui/core';
import { TableCell } from './EditableTable.js';
import { LANGUAGE } from '../../../../app/utils/constants.js';

const { addRowButtonLabel } = LANGUAGE.shared.components.editableTable;

const AddRowButtonRow = React.memo(function AddRowButtonRow({ numColumns, onAddRow }) {
    return (
        <TableRow>
            <TableCell colSpan={ numColumns }>
                <ThemedButton onClick={ onAddRow } variant="outlined">
                    { addRowButtonLabel }
                </ThemedButton>
            </TableCell>
        </TableRow>
    )
});

AddRowButtonRow.propTypes = {
    numColumns: PropTypes.number.isRequired,
    onAddRow: PropTypes.func.isRequired
};

export default AddRowButtonRow;