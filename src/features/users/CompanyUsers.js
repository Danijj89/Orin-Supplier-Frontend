import React from 'react';
import { Add as IconAdd } from '@material-ui/icons';
import { LANGUAGE } from '../../app/utils/constants.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List, ListItem, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectAllUsers } from './duck/selectors.js';
import Permission from '../shared/permissions/Permission.js';
import { USER } from '../admin/utils/resources.js';
import { CREATE_ANY, CREATE_OWN, READ_ANY, READ_OWN } from '../admin/utils/actions.js';

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
        <Permission resource={ USER } action={ [READ_ANY, READ_OWN] }>
            <InfoCard
                title={ titleLabel }
                button={
                    <Permission resource={ USER } action={ [CREATE_ANY, CREATE_OWN] }>
                        <ThemedButton variant="text">
                            { inviteButtonLabel }
                            <IconAdd/>
                        </ThemedButton>
                    </Permission>
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
        </Permission>
    );
});

export default CompanyUsers;
