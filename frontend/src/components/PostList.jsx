import Post from "./Post";
import React from "react";

// Component to display list of posts with links to individual post details
const PostList = ({ posts }) => {

  const [openPost, setOpenPost] = React.useState(false);
  const [heading, setHeading] = React.useState(null);
  const [para, setPara] = React.useState(null);

  if (posts.length === 0) {
    return <p className="empty">No posts found.</p>;
  }

  const handlePostClick = (post) => {
    setHeading(post.title);
    setPara(post.body);
    setOpenPost(true);
  };

  return (
    <div>
      {posts.map((post) => (
        <div onClick={handlePostClick.bind(null, post)} key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
      {
        openPost && <Post heading={heading} para={para} onClose={() => setOpenPost(false)} />
      }
    </div>
  );
};

export default PostList;

// Previous version without links
// const PostList = ({ posts }) => {
//   return (
//     <div>
//       {posts.map((post) => (
//         <div key={post.id} style={{ margin: "10px 0" }}>
//           <h3>{post.title}</h3>
//           <p>{post.body}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PostList;