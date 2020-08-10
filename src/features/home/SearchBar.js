import React, { useState } from 'react';
import { LANGUAGE } from '../../constants.js';

export default function SearchBar() {
    const { search } = LANGUAGE.searchBar;
    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTermChange = e => setSearchTerm(e.target.value);

    const onSubmit = () => {
        console.log(searchTerm);
    }

    return (
        <div className="d-flex">
            <div className="input-group input-group-lg">
                <input
                    type="text"
                    className="form-control"
                    value={searchTerm}
                    onChange={onSearchTermChange}
                />
            </div>
            <button type="submit" onClick={onSubmit}>{search}</button>
        </div>

    );
}