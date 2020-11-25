import React from 'react';
import { Add as IconAdd } from '@material-ui/icons';
import { LANGUAGE } from '../../app/constants.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List, ListItem, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectAllUsers } from './duck/selectors.js';

const useStyles = makeStyles((theme) => ({
    list: {
        minHeight: 500,
        padding: 0,
    },
    listItem: {
        padding: theme.spacing(2),
    },
}));

const { titleLabel, inviteButtonLabel } = LANGUAGE.home.companyUsers;

const CompanyUsers = React.memo(function CompanyUsers() {
    const classes = useStyles();
    const users = useSelector(selectAllUsers);

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
                    { users.map((user) => (
                        <Box key={ user._id }>
                            <ListItem className={ classes.listItem } disabled={ !user.active }>
                                { user.name }
                            </ListItem>
                            <Divider/>
                        </Box>
                    )) }
                </List>
            }
        />
    );
});

export default CompanyUsers;
