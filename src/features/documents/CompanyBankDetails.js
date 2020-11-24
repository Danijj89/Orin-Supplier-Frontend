import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveCompanyBankDetails, selectCompanyId } from '../home/duck/selectors.js';
import BankDetailDialog from '../home/BankDetailDialog.js';
import NewBankDetailButton from '../home/NewBankDetailButton.js';
import { deleteCompanyBankDetail, updateCompanyBankDetail } from '../home/duck/thunks.js';
import Table from '../shared/components/table/Table.js';

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
    dialogSubmitLabel,
    tableHeaderLabelsMap
} = LANGUAGE.home.companyDetails.bankDetails;

const CompanyBankDetails = React.memo(function CompanyBankDetails() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const bankDetails = useSelector(selectActiveCompanyBankDetails);
    const companyId = useSelector(selectCompanyId);
    const [isEdit, setIsEdit] = useState(false);
    const [editBankDetail, setEditBankDetail] = useState(null);

    const onDelete = (id) => {
        dispatch(deleteCompanyBankDetail({ companyId, bankDetailId: id }));
        setIsEdit(false);
    };

    const onCancel = () => setIsEdit(false);

    const onRowClick = (params) => {
        setEditBankDetail(params);
        setIsEdit(true);
    };

    const onUpdate = (data) => {
        const { _id, ...update } = data;
        dispatch(updateCompanyBankDetail({ companyId, bankDetailId: _id, update }));
        setIsEdit(false);
    };

    const columns = [
        { field: 'id', hide: true },
        { field: 'detail', headerName: tableHeaderLabelsMap.detail }
    ];

    const rows = bankDetails.map(bankDetail => ({
        id: bankDetail._id,
        detail: bankDetail.detail
    }));

    return (
        <Box>
            <Typography className={ classes.title } variant="h5">
                { titleLabel }
            </Typography>
            <Table rows={ rows } columns={ columns } onRowClick={ onRowClick }/>
            { editBankDetail &&
            <BankDetailDialog
                isOpen={ isEdit }
                bankDetail={ editBankDetail }
                titleLabel={ dialogTitleLabel }
                submitLabel={ dialogSubmitLabel }
                onCancel={ onCancel }
                onSubmit={ onUpdate }
                onDelete={ () => onDelete(editBankDetail._id) }
            />
            }
            <NewBankDetailButton/>
        </Box>
    )
});

export default CompanyBankDetails;