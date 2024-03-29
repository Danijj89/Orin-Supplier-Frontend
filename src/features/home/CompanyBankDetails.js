import React, { useCallback, useMemo, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from 'app/utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveCompanyBankDetails } from 'features/home/duck/home/selectors.js';
import BankDetailDialog from './BankDetailDialog.js';
import NewBankDetailButton from './NewBankDetailButton.js';
import { deleteCompanyBankDetail, updateCompanyBankDetail } from 'features/home/duck/home/thunks.js';
import Table from '../shared/components/table/Table.js';
import { CREATE_ANY, CREATE_OWN, UPDATE_ANY, UPDATE_OWN } from '../admin/utils/actions.js';
import { selectSessionUserCompanyId } from 'app/duck/selectors.js';
import CompanyPermission from '../shared/permissions/CompanyPermission.js';

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
    const companyId = useSelector(selectSessionUserCompanyId);
    const [isEdit, setIsEdit] = useState(false);
    const [editBankDetail, setEditBankDetail] = useState(null);

    const onDelete = useCallback(id => {
        dispatch(deleteCompanyBankDetail({ companyId, bankDetailId: id }));
        setIsEdit(false);
    }, [dispatch, companyId]);

    const onCancel = useCallback(() => setIsEdit(false), []);

    const onRowClick = useCallback(params => {
        const { id, ...rest } = params;
        setEditBankDetail({ _id: id, ...rest });
        setIsEdit(true);
    }, []);

    const onUpdate = useCallback(data => {
        const { _id, ...update } = data;
        dispatch(updateCompanyBankDetail({ companyId, bankDetailId: _id, update }));
        setIsEdit(false);
    }, [dispatch, companyId]);

    const columns = useMemo(() => [
        { field: 'id', hide: true },
        { field: 'detail', headerName: tableHeaderLabelsMap.detail }
    ], []);

    const rows = useMemo(() => bankDetails.map(bankDetail => ({
        id: bankDetail._id,
        detail: bankDetail.detail
    })), [bankDetails]);

    const options = useMemo(() => ({
        body: {
            onRowClick
        }
    }), [onRowClick]);

    return (
        <Box>
            <Typography className={ classes.title } variant="h5">
                { titleLabel }
            </Typography>
            <Table rows={ rows } columns={ columns } options={ options }/>
            { editBankDetail &&
            <CompanyPermission action={ [UPDATE_ANY, UPDATE_OWN] } companyId={ companyId }>
                <BankDetailDialog
                    isOpen={ isEdit }
                    bankDetail={ editBankDetail }
                    titleLabel={ dialogTitleLabel }
                    submitLabel={ dialogSubmitLabel }
                    onCancel={ onCancel }
                    onSubmit={ onUpdate }
                    onDelete={ () => onDelete(editBankDetail._id) }
                />
            </CompanyPermission>
            }
            <CompanyPermission action={ [CREATE_ANY, CREATE_OWN] } companyId={ companyId }>
                <NewBankDetailButton/>
            </CompanyPermission>
        </Box>
    )
});

export default CompanyBankDetails;