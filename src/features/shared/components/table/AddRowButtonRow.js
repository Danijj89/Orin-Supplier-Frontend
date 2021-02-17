import React from 'react';
import PropTypes from 'prop-types';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import { TableRow } from '@material-ui/core';
import { LANGUAGE } from 'app/utils/constants.js';
import EditTableCell from 'features/shared/components/table/cells/EditTableCell.js';

const { addRowButtonLabel } = LANGUAGE.shared.components.editableTable;

const AddRowButtonRow = React.memo(function AddRowButtonRow({ numColumns, onAddRow }) {
    return (
        <TableRow>
            <EditTableCell colSpan={ numColumns }>
                <ThemedButton onClick={ onAddRow } variant="outlined" size="small">
                    { addRowButtonLabel }
                </ThemedButton>
            </EditTableCell>
        </TableRow>
    )
});

AddRowButtonRow.propTypes = {
    numColumns: PropTypes.number.isRequired,
    onAddRow: PropTypes.func.isRequired
};

export default AddRowButtonRow;