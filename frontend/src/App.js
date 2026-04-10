import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar.jsx";
import PostList from "./components/PostList.jsx";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          axios.get("http://localhost:5000/api/posts/fetch-posts")
            .then(() => {
              // After fetching, try getting posts again
              axios.get("http://localhost:5000/api/posts")
                .then((res) => setPosts(res.data))
                .catch((err) => console.error("Error fetching posts after fetch:", err));
            })
            .catch((err) => console.error("Error fetching posts from external API:", err));
        } else {
          console.error("Error fetching posts:", err);
        }
      });

  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Posts</h1>
      <SearchBar setPosts={setPosts} />
      <PostList posts={posts} />
    </div>
  );
}

export default App;