import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LANGUAGE } from '../../constants.js';
import OrderTableRow from './OrderTableRow.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from './duck/thunks.js';
import { selectAllOrders } from './duck/slice.js';

const { newOrder, column1, column2, column3, column4, column5, column6 } = LANGUAGE.OrdersOverview;

export default function OrdersOverview() {
    const dispatch = useDispatch();
    const orders = useSelector(selectAllOrders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch])

    return (
        <div className="container-fluid h-100 p-5">
            <Link to="/home/orders/create" className="btn btn-primary my-2 float-right">{newOrder}</Link>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">{column1}</th>
                    <th scope="col">{column2}</th>
                    <th scope="col">{column3}</th>
                    <th scope="col">{column4}</th>
                    <th scope="col">{column5}</th>
                    <th scope="col">{column6}</th>
                </tr>
                </thead>
                <tbody>
                    {orders && orders.map((order, index) => <OrderTableRow key={index} order={order} />)}
                </tbody>
            </table>
        </div>
    )
}