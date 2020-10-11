import React, { useEffect, useState } from 'react';
import { LANGUAGE } from '../../constants.js';
import {
  TextField,
  Typography,
  Button,
  Container,
  Box,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Controller } from 'react-hook-form';
import {
  DirectionsBoat as IconDirectionsBoat,
  ExpandLess as IconExpandLess,
  ExpandMore as IconExpandMore,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const {
  shippingInformation,
  deliveryMethod,
  portOfLoading,
  portOfDestination,
  shippingCarrier,
} = LANGUAGE.order.shippingInfo;

const useStyles = makeStyles((theme) => ({
  container: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.primary.main,
    borderRadius: 10,
    marginTop: theme.spacing(3),
    marginBot: theme.spacing(3),
    padding: 0,
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  box: {
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%',
  },
  field: {
    marginTop: 8,
    marginBottom: 8,
  },
}));

export default function CreatePOShippingInfo({ register, control }) {
  const classes = useStyles();
  const [hidden, setHidden] = useState(true);
  const { deliveryMethods, ports } = useSelector();

  useEffect(() => {
    if (!hidden) window.scrollTo(0, document.body.scrollHeight);
  }, [hidden]);

  const onShippingInfoClick = () => setHidden((prev) => !prev);

  return (
    <Container className={classes.container}>
      {hidden && (
        <Button
          className={classes.title}
          onClick={onShippingInfoClick}
          fullWidth
        >
          <IconDirectionsBoat color="primary" />
          <Typography variant="subtitle2">{shippingInformation}</Typography>
          <IconExpandMore />
        </Button>
      )}
      {!hidden && (
        <>
          <Button
            className={classes.title}
            onClick={onShippingInfoClick}
            fullWidth
          >
            <IconDirectionsBoat />
            <Typography variant="subtitle1">{shippingInformation}</Typography>
            <IconExpandLess />
          </Button>
          <Box className={classes.box}>
            <Controller
              render={(props) => (
                <Autocomplete
                  {...props}
                  options={deliveryMethods}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={deliveryMethod}
                      variant="standard"
                      className={classes.field}
                      autoFocus
                    />
                  )}
                  onChange={(_, data) => props.onChange(data)}
                />
              )}
              name="del"
              control={control}
            />
            <Controller
              render={(props) => (
                <Autocomplete
                  freeSolo
                  autoSelect
                  {...props}
                  options={ports}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={portOfLoading}
                      variant="standard"
                      className={classes.field}
                    />
                  )}
                  onChange={(_, data) => props.onChange(data)}
                />
              )}
              name="pol"
              control={control}
            />
            <Controller
              render={(props) => (
                <Autocomplete
                  freeSolo
                  autoSelect
                  {...props}
                  options={ports}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={portOfDestination}
                      variant="standard"
                      className={classes.field}
                    />
                  )}
                  onChange={(_, data) => props.onChange(data)}
                />
              )}
              name="pod"
              control={control}
            />
            <TextField
              label={shippingCarrier}
              type="text"
              name="carrier"
              inputRef={register}
              fullWidth
              className={classes.field}
            />
          </Box>
        </>
      )}
    </Container>
  );
}
