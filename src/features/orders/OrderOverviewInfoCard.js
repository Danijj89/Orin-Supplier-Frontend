import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../constants.js';
import OrderInfoCard from './OrderInfoCard.js';
import OrderOverviewInfoCardView from './OrderOverviewInfoCardView.js';
import { useForm } from 'react-hook-form';
import OrderOverviewInfoCardEdit from './OrderOverviewInfoCardEdit.js';

const { title } = LANGUAGE.order.orderInfoTile;

const useStyles = makeStyles((theme) => ({
    row: {
        padding: theme.spacing(0.5),
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    rowLabel: {
        color: theme.palette.tertiary['600'],
        marginRight: theme.spacing(2)
    }
}));

export default function OrderOverviewInfoCard({ order }) {
    const classes = useStyles();
    const [isEdit, setIsEdit] = useState(false);

    const rhf = useForm({
        mode: 'onSubmit',
        defaultValues: {
        }
    });

    const onEditClick = () => setIsEdit(true);

    return (
        <OrderInfoCard
            title={ title }
            isEdit={isEdit}
            onEdit={onEditClick}
            // onCancel={onEditCancelClick}
            // onConfirm={handleSubmit(onSubmitClick)}
        >
            {!isEdit && <OrderOverviewInfoCardView order={order} />}
            {isEdit && <OrderOverviewInfoCardEdit rhf={rhf} /> }
        </OrderInfoCard>
    )
}