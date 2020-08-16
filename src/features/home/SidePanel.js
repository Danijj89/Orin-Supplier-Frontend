import React from 'react';
import logo from '../../images/orinlogo.png';
import './styles.css';
import { LANGUAGE } from '../../constants.js';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentCompany, selectCurrentUser } from './slice.js';

export default function SidePanel() {
    const { orders, clients, documents } = LANGUAGE.home.sidePanel;
    const user = useSelector(selectCurrentUser);
    const company = useSelector(selectCurrentCompany);
    return (
        <section className="side-panel h-100">
            <img src={logo} alt="Logo"/>
            <div className="my-5">
                <div className="font-weight-bold m-2">{user.name}</div>
                <div className="font-weight-light m-2">At: {company.name}</div>
            </div>
            <nav className="nav flex-column">
                <Link className="nav-link" to="/home/orders">{orders}</Link>
                <Link className="nav-link" to="/home/clients">{clients}</Link>
                <Link className="nav-link" to="/home/documents">{documents}</Link>
            </nav>
        </section>
    )
}