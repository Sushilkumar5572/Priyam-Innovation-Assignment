const PostList = ({ posts }) => {
    return (
        <div className="posts-list">
            {posts.map((post) => (
                <div key={post.id} className="post">
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
};

export default PostList;