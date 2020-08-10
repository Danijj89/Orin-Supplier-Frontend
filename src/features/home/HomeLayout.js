import React from 'react';
import SidePanel from './SidePanel.js';
import SearchBar from './SearchBar.js';

export default function HomeLayout({ children }) {

    return (
        <section className="container-fluid h-100">
            <div className="row h-100">
                <div className="col-2 h-100">
                    <SidePanel />
                </div>
                <div className="col-10 bg-light">
                    <SearchBar />
                    {children}
                </div>
            </div>
        </section>
    );
}