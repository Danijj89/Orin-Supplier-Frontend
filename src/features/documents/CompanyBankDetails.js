import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyBankDetails } from '../home/duck/selectors.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Edit as IconEdit } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import BankDetailDialog from '../home/BankDetailDialog.js';
import NewBankDetailButton from '../home/NewBankDetailButton.js';

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
    titleLabel,
    dialogTitleLabel,
    dialogSubmitLabel
} = LANGUAGE.home.companyDetails.bankDetails;

const CompanyBankDetails = React.memo(function CompanyBankDetails() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const bankDetails = useSelector(selectCompanyBankDetails);
    const [isEdit, setIsEdit] = useState(false);
    const [editBankDetail, setEditBankDetail] = useState(null);

    const onDelete = (id) => {};

    const onCancel = () => setIsEdit(false);

    const onEdit = (bankDetail) => {
        setEditBankDetail(bankDetail);
        setIsEdit(true);
    };

    const onSubmit = (data) => dispatch();

    return (
        <Box>
            <Typography className={ classes.title } variant="h5">
                { titleLabel }
            </Typography>
            <List>
                { bankDetails.map((bankDetail, idx) =>
                    <ListItem key={ idx }>
                        <ListItemText primary={ bankDetail.detail }/>
                        <ListItemIcon>
                            <IconButton onClick={ () => onEdit(bankDetail) }>
                                <IconEdit/>
                            </IconButton>
                        </ListItemIcon>
                    </ListItem>
                ) }
            </List>
            { editBankDetail &&
            <BankDetailDialog
                isOpen={ isEdit }
                bankDetail={ editBankDetail }
                titleLabel={ dialogTitleLabel }
                submitLabel={ dialogSubmitLabel }
                onCancel={ onCancel }
                onSubmit={ onSubmit }
                onDelete={ () => onDelete(editBankDetail._id) }
            />
            }
            <NewBankDetailButton />
        </Box>
    )
});

export default CompanyBankDetails;