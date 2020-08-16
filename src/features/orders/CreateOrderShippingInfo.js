import React, { useEffect, useRef } from 'react';
import { LANGUAGE } from '../../constants.js';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Controller } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import { DirectionsBoat, ExpandLess, ExpandMore } from '@material-ui/icons';
import { selectPOAutocompleteOptions } from './duck/selectors.js';

const {useState} = require('react');


const {
    shippingInformation, deliveryMethod, portOfLoading,
    portOfDestination, shippingCarrier
} = LANGUAGE.order.shippingInfo;

export default function CreateOrderShippingInfo({register, control}) {
    const mounted = useRef();
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        if (mounted) window.scrollTo(0, document.body.scrollHeight);
    }, [hidden]);

    const { deliveryOptions, ports } = useSelector(selectPOAutocompleteOptions);

    const onShippingInfoClick = () => setHidden(!hidden);

    return (
        <div className="container-fluid border rounded border-primary p-3 shipment-info">
            {hidden &&
            <Button id="shippingInfo" onClick={onShippingInfoClick} fullWidth>
                <Typography variant="subtitle1">
                    <DirectionsBoat></DirectionsBoat>
                    &nbsp;{shippingInformation}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <ExpandMore></ExpandMore>
                </Typography>
            </Button>}
            {!hidden &&
            <>
                <Button id="shippingInfo" onClick={onShippingInfoClick} fullWidth>
                    <Typography variant="subtitle1">
                        <DirectionsBoat></DirectionsBoat>
                        &nbsp;{shippingInformation}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <ExpandLess></ExpandLess>
                    </Typography>
                </Button>
                <Controller
                    render={props => (
                        <Autocomplete
                            {...props}
                            id="deliveryMethod"
                            options={deliveryOptions}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label={deliveryMethod}
                                    variant="standard"
                                />
                            )}
                            onChange={(_, data) => props.onChange(data)}
                        />
                    )}
                    name="deliveryMethod"
                    control={control}
                />
                <Controller
                    render={props => (
                        <Autocomplete
                            freeSolo
                            autoSelect
                            {...props}
                            options={ports}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label={portOfLoading}
                                    variant="standard"
                                />
                            )}
                            onChange={(_, data) => props.onChange(data)}
                        />
                    )}
                    name="portOfLoading"
                    control={control}
                />
                <Controller
                    render={props => (
                        <Autocomplete
                            freeSolo
                            autoSelect
                            {...props}
                            options={ports}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label={portOfDestination}
                                    variant="standard"
                                />
                            )}
                            onChange={(_, data) => props.onChange(data)}
                        />
                    )}
                    name="portOfDestination"
                    control={control}
                />
                <TextField
                    label={shippingCarrier}
                    type="text"
                    name="shippingCarrier"
                    inputRef={register}
                    fullWidth
                />
            </>
            }
        </div>
    )
}