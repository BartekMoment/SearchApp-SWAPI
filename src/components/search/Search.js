import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ItemBox from '../ItemBox/ItemBox'
import Logo from '../../assets/logo.png';
import {DebounceInput} from 'react-debounce-input';

import './search.scss';

const Search = () => {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const url ='https://swapi.co/api/people/?search=';

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await axios.get(`${url}${query}`);
            console.log(result.data);
            setData(result.data.results);
            setLoading(false);
        };
        fetchData();
    }, [query]);

    const setSearchQuery = (e => {
        setQuery(e.target.value)
    });
    
    return (
        <div className="search">
            <img src={Logo} id="logo" alt='Logo Star Wars' />
            <div className="searchBox">
                <p>
                <label>Nazwa postaci:</label>
                </p>
                <DebounceInput
                    id="search"
                    minLength={2}
                    debounceTimeout={600}
                    value={query}
                    onChange={setSearchQuery} />
            </div>
                <h3>Znaleziona liczba elementów: { data.length }</h3>
                {loading ? <div>Ładowanie...</div> : <div className="results"><ItemBox list={data}/></div>}
        </div>
    );
}
export default Search;