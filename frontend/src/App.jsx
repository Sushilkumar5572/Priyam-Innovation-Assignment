import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import SearchBar from './components/SearchBar';
import PostList from './components/PostList';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

function App() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const socketRef = useRef(null);

    useEffect(() => {
        // Fetch initial posts
        fetchPosts();

        // Connect to WebSocket with reconnect logic
        const connectSocket = () => {
            const newSocket = io(SOCKET_URL);
            socketRef.current = newSocket;

            newSocket.on('connect', () => {
                console.log('Connected to WebSocket');
            });

            newSocket.on('disconnect', () => {
                console.log('Disconnected from WebSocket, attempting to reconnect...');
                setTimeout(connectSocket, 1000); // Reconnect after 1 second
            });

            newSocket.on('searchResults', (results) => {
                setPosts(results);
                setLoading(false);
            });

            newSocket.on('error', (err) => {
                setError(err);
                setLoading(false);
            });
        };

        connectSocket();

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            await axios.get(`${API_BASE_URL}/fetch-posts`);
            const response = await axios.get(`${API_BASE_URL}/posts`);
            setPosts(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch posts');
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
        if (socketRef.current) {
            socketRef.current.emit('search', query);
        }
    };

    return (
        <div className="app">
            <h1>Real-Time Posts App</h1>
            <SearchBar onSearch={handleSearch} />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <PostList posts={posts} />
        </div>
    );
}

export default App;