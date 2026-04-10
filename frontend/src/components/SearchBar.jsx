
import { useEffect, useRef } from "react";

const SearchBar = ({ setPosts }) => {
    const ws = useRef(null);
    const timeout = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket("wss://priyam-innovation-assignment-backend.onrender.com/");

        ws.current.onopen = () => {
            console.log("WebSocket connected");
        };

        ws.current.onmessage = (event) => {
            setPosts(JSON.parse(event.data));
        };

        return () => ws.current.close();
    }, [setPosts]);

    const handleChange = (e) => {
        const value = e.target.value;

        clearTimeout(timeout.current);

        timeout.current = setTimeout(() => {
            if (ws.current.readyState === WebSocket.OPEN) {

                ws.current.send(value);
            }
            else {
                console.error("WebSocket is not open");
            }
        }, 300);
    };

    return (
        <div>
            <input
                className="search-input"
                type="text"
                placeholder="Search posts..."
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;
