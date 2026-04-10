
import { useEffect, useRef } from "react";

const SearchBar = ({ setPosts }) => {
    const ws = useRef(null);
    const timeout = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:5001");

        ws.current.onmessage = (event) => {
            setPosts(JSON.parse(event.data));
        };

        return () => ws.current.close();
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;

        clearTimeout(timeout.current);

        timeout.current = setTimeout(() => {
            ws.current.send(value);
        }, 300);
    };

    return (
        <input
            className="search-input"
            type="text"
            placeholder="Search posts..."
            onChange={handleChange}
        />
    );
};

export default SearchBar;
