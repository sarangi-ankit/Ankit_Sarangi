// src/Filter.js
import React from 'react';

const Filter = ({ filter, onFilterChange }) => {
    return (
        <input
            type="text"
            placeholder="Filter by name"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
        />
    );
};

export default Filter;
