import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { DirectionsBoat, ExpandLess, ExpandMore } from '@material-ui/icons';
import { Controller } from 'react-hook-form';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function CreateCIReferenceInfo({register, control}) {
    const mounted = useRef();
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        if (mounted && !hidden) window.scrollTo(0, document.body.scrollHeight);
    }, [hidden]);

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
                <TextField
                    label={countryOfManufacture}
                    type="text"
                    name="com"
                    inputRef={register}
                    className={classes.field}
                    fullWidth
                />
                <TextField
                    label={additionalNotes}
                    type="text"
                    name="notes"
                    inputRef={register}
                    className={classes.field}
                    fullWidth
                />
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