import { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onSearch(query);
        }, 300); // Debounce delay

        return () => clearTimeout(timeoutId);
    }, [query, onSearch]);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <input
            type="text"
            className="search-bar"
            placeholder="Search posts..."
            value={query}
            onChange={handleChange}
        />
    );
};

export default SearchBar;