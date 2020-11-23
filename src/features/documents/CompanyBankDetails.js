import React from 'react';
import { Box, Typography } from '@material-ui/core';
import AddressDialog from '../shared/forms/AddressDialog.js';
import NewCompanyAddressButton from '../home/NewCompanyAddressButton.js';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../app/constants.js';
import { useSelector } from 'react-redux';
import { selectCompanyBankDetails } from '../home/duck/selectors.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Edit as IconEdit } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import DeleteIconButton from '../shared/buttons/DeleteIconButton.js';

const useStyles = makeStyles((theme) => ({
    cards: {
        display: 'flex',
    },
    title: {
        fontWeight: 'bold',
        padding: theme.spacing(2),
        color: theme.palette.tertiary[700],
    },
    newAddressButton: {
        margin: theme.spacing(2),
    },
}));

const {
    titleLabel
} = LANGUAGE.home.companyDetails.bankDetails;

const CompanyBankDetails = React.memo(function CompanyBankDetails() {
    const classes = useStyles();
    const bankDetails = useSelector(selectCompanyBankDetails);

    return (
        <Box>
            <Typography className={ classes.title } variant="h5">
                { titleLabel }
            </Typography>
            <List>
                { bankDetails.map((bankDetail, index) =>
                    <ListItem key={ index }>
                        <ListItemText primary={ bankDetail }/>
                        <ListItemIcon>
                            <IconButton>
                                <IconEdit/>
                            </IconButton>
                        </ListItemIcon>
                        <DeleteIconButton onClick={}
                    </ListItem>
                ) }
            </List>
        </Box>
    )
});

export default CompanyBankDetails;

// { editAddress && (
//     <AddressDialog
//         isOpen={ isEditAddressOpen }
//         address={ editAddress }
//         titleLabel={ editAddressDialogTitleLabel }
//         submitLabel={ editAddressDialogSubmitLabel }
//         onCancel={ onEditAddressCancel }
//         onSubmit={ onEditAddressSubmit }
//     />
// ) }
// <NewCompanyAddressButton
//     className={ classes.newAddressButton }
//     company={ company }
// />