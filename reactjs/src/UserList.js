// src/UserList.js
import React, { useState, useMemo } from 'react';
import useFetch from './hook/useFetch';
import Filter from './Filter';


const UserList = () => {
    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');
    const [filter, setFilter] = useState('');

    const filteredData = useMemo(() => {
        if (filter) {
            const lowercasedFilter = filter.toLowerCase();
            return data.filter(item =>
                item.name.toLowerCase().includes(lowercasedFilter)
            );
        }
        return data;
    }, [filter, data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    return (
        <div>
            <h1>Data List</h1>
            <Filter filter={filter} onFilterChange={setFilter} />
            <ul>
                {filteredData.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
