import React, { useState } from 'react';
import {
    Paper,
    Typography,
    Container,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectCurrentCompany } from './duck/slice.js';
import { LANGUAGE } from '../../constants.js';
import NewAddressDialogButton from './NewAddressDialogButton.js';
import EditableCard from '../shared/components/EditableCard.js';

const { addressesTitleLabel, addressTableHeadersMap } = LANGUAGE.home.companySettingsTab;

export default function CompanySettingsTab() {
    const company = useSelector(selectCurrentCompany);
    const [isEdit, setIsEdit] = useState(false);

    return (
        <>
            <EditableCard
                title={ company.legalAddress.name }
                isEdit={isEdit}
            >
                <Typography>{ company.legalAddress.address }</Typography>
            </EditableCard>
            <Paper>
                <Container>
                    <Typography>{ addressesTitleLabel }</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    { Object.entries(addressTableHeadersMap).map(([key, value]) => <TableCell
                                        key={ key }>{ value }</TableCell>) }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { company.addresses.map((address, index) => (
                                    <TableRow key={ index }>
                                        <TableCell>{ address.type }</TableCell>
                                        <TableCell>{ address.name }</TableCell>
                                        <TableCell>{ address.address }</TableCell>
                                        <TableCell>{ address.city }</TableCell>
                                        <TableCell>{ address.administrative }</TableCell>
                                        <TableCell>{ address.country }</TableCell>
                                        <TableCell>{ address.zip }</TableCell>
                                        <TableCell>{ address.phone }</TableCell>
                                    </TableRow>
                                )) }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <NewAddressDialogButton/>
                </Container>
            </Paper>
        </>
    )
}