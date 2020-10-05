import React from 'react';
import { Add as IconAdd } from '@material-ui/icons';
import { LANGUAGE } from '../../constants.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    list: {
        minHeight: 500,
        padding: 0
    }
}))

const { titleLabel, inviteButtonLabel } = LANGUAGE.home.companyUsers;

export default function CompanyUsers({ users }) {
    const classes = useStyles();

    return (
        <InfoCard
            title={ titleLabel }
            button={
                <ThemedButton variant="text">
                    { inviteButtonLabel }
                    <IconAdd/>
                </ThemedButton>
            }
            content={
                <List className={ classes.list }>
                    { users.map(user =>
                        <>
                            <ListItem>{user.name}</ListItem>
                            <Divider/>
                        </>
                    ) }
                </List>
            }
        />
    )
}

