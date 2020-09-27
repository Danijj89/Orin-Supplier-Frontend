import React from 'react';
import { Grid, TextField as MuiTextField  } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';

const useStyles = ((theme) => ({

}));

const { orderLabel, dateTitle, crdTitle, incotermTitle,
    quantityTitle, remarksLabel, companyNameLabel,
    companyAddressLabel, totalAmountLabel } = LANGUAGE.order.orderInfoTile;

export default function OrderOverviewInfoCardEdit({ rhf }) {
    const classes = useStyles();
    const { register, errors } = rhf;

    const TextField = ({ required = false, name, ...props }) =>
        <Grid item xs={ 6 } className={ classes.row }>
            <TextField
                {...props}
                inputRef={register({ required })}
                errors={ !!errors[name] }/>
        </Grid>

    return (
        <Grid container>
            <TextField
                name="poRef"
                required={true}
                label={orderLabel}
            />
            <TextField
                name="remarks"
                label={remarksLabel}
            />
        </Grid>
    )
}