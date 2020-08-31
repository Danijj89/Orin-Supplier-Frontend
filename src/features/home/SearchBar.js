import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search as IconSearch } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllOrders } from '../orders/duck/slice.js';
import { LANGUAGE } from '../../constants.js';
import { fetchOrders } from '../orders/duck/thunks.js';
import { selectPOStatus } from '../orders/duck/selectors.js';

const { search } = LANGUAGE.home.searchBar;

const useStyles = makeStyles({
    container: {
        display: 'flex'
    },
    searchButton: {
        backgroundColor: 'lightgrey'
    }
})

export default function SearchBar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState('');
    const orders = useSelector(selectAllOrders);
    const refs = orders.map(order => order.poRef);
    const status = useSelector(selectPOStatus);

    const onSearchTermChange = val => setSearchTerm(val);

    const onSubmit = () => {
        if (refs.includes(searchTerm)) {
            const poId = orders.find(order => order.poRef === searchTerm)._id;
            history.push(`/home/orders/${poId}`);
        }
    }

    const mounted = useRef();
    useEffect(() => {
        if (orders.length === 0) {
            if (mounted.current !== status && status === 'IDLE') {
                dispatch(fetchOrders());
                mounted.current = status;
            }
        }
    }, [dispatch, orders, status]);

    return (
        <Container className={ classes.container }>
            <Autocomplete
                freeSolo
                autoSelect
                options={ refs }
                renderInput={ params => (
                    <TextField
                        { ...params }
                        variant="outlined"
                        InputProps={{...params.InputProps, startAdornment: <IconSearch onClick={onSubmit}/>}}
                    />
                ) }
                onChange={ (_, data) => onSearchTermChange(data) }
                value={searchTerm}
                fullWidth
                size="small"
                onKeyUp={(e) => {
                    if (e.key === 'Enter') onSubmit();
                }}
            />
            <Button variant="outlined" className={classes.searchButton} onClick={onSubmit}>{ search }</Button>
        </Container>
    );
}