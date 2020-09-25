import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, TextField, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search as IconSearch } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllOrders } from '../orders/duck/slice.js';
import { fetchOrders } from '../orders/duck/thunks.js';
import { selectOrderStatus } from '../orders/duck/selectors.js';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  paper: {
    width: '100%',
    borderRadius: 4,
  },
  searchFieldRoot: {
    backgroundColor: theme.palette.backgroundPrimary.main,
    borderRadius: 4,
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
}));

export default function SearchBar({options}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const orders = useSelector(selectAllOrders);
  const refs = orders.map((order) => order.poRef);
  const status = useSelector(selectOrderStatus);

  const onSearchTermChange = (val) => setSearchTerm(val);

  const onSubmit = () => {
    if (refs.includes(searchTerm)) {
      const poId = orders.find((order) => order.poRef === searchTerm)._id;
      history.push(`/home/orders/${poId}/0`);
    }
  };

  const mounted = useRef();
  useEffect(() => {
    if (orders.length === 0) {
      if (mounted.current !== status && status === 'IDLE') {
        dispatch(fetchOrders());
        mounted.current = status;
      }
    }
  }, [dispatch, status, orders]);

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={2}>
        <Autocomplete
          options={refs}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                startAdornment: <IconSearch onClick={onSubmit} />,
                classes: { root: classes.searchFieldRoot },
              }}
              classes={{ root: classes.searchFieldRoot }}
            />
          )}
          onChange={(_, data) => onSearchTermChange(data)}
          value={searchTerm}
          size="small"
          fullWidth
          onKeyUp={(e) => {
            if (e.key === 'Enter') onSubmit();
          }}
        />
      </Paper>
    </Container>
  );
}
