import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ItemBox from '../ItemBox/ItemBox'
import Radio from '../search/FormRadio/FormRadio'
import Logo from '../../assets/logo.png';
import {DebounceInput} from 'react-debounce-input';

import './search.scss';

const Search = () => {
    const types = {
        people: 'people',
        films: 'films',
        planets: 'planets'
    }

    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeOptions, setActiveOptions] = useState(types.people);


    const handleRadioButtonChange = (type) => setActiveOptions(type);

    const url ='https://swapi.co/api/';

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await axios.get(`${url}${activeOptions}/?search=${query}`);
            console.log(result.data);
            setData(result.data.results);
            setLoading(false);
        };
        fetchData();
    }, [query, activeOptions]);

    const setSearchQuery = (e => {
        setQuery(e.target.value)
    });

    
    
    return (
        <div className="search">
            <img src={Logo} id="logo" alt='Logo Star Wars' />
            <div className="searchBox">
                <DebounceInput
                    id="search"
                    type="search"
                    placeholder={'Search ' + activeOptions}
                    minLength={2}
                    debounceTimeout={600}
                    value={query}
                    onChange={setSearchQuery} />
                    <form autoComplete="off">
                    <Radio 
                        id={types.people}
                        type="radio"
                        checked={setActiveOptions === types.people}
                        changeFn={() => handleRadioButtonChange(types.people)}
                    >
                        People
                    </Radio>
                    <Radio 
                        id={types.films}
                        type='radio'
                        checked={setActiveOptions === types.films}
                        changeFn={() => handleRadioButtonChange(types.films)}
                    >
                        Films
                    </Radio>
                    <Radio 
                        id={types.planets}
                        type='radio'
                        checked={setActiveOptions === types.planets}
                        changeFn={() => handleRadioButtonChange(types.planets)}
                    >
                        Planets
                    </Radio>
                    </form>
            </div>
                <h3>Items found: { data.length }</h3>
                {
                    (query.length <= 2) ? null : (loading) ? <div>Ładowanie...</div> : <div className="results"><ItemBox list={data}/></div>
                }
                {/* {loading ? <div>Ładowanie...</div> : <div className="results"><ItemBox list={data}/></div>} */}
        </div>
    );
}
export default Search;