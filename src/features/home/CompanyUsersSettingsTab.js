import React from 'react';
import { Card, Divider, Grid, Table, TableContainer, Typography, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Add as IconAdd } from '@material-ui/icons';
import { LANGUAGE } from '../../constants.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';

const { titleLabel, inviteButtonLabel } = LANGUAGE.home.companyUsersSettingsTab;

export default function CompanyUsersSettingsTab({ users }) {

    return (
        <Card>
            <Grid container>
                <Grid container justify="space-between" alignItems="center" item xs={ 12 }>
                    <Typography>{ titleLabel }</Typography>
                    <ThemedButton variant="text">
                        {inviteButtonLabel}
                        <IconAdd />
                    </ThemedButton>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table size="small">
                            <TableBody>
                                {users.map(user =>
                                    <TableRow key={user._id}>
                                        <TableCell>
                                            <Typography>{user.name}</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Card>
    )
}