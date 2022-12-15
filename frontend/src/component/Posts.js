import axios from "axios";
import React, { useEffect, useState } from "react";
import SinglePost from "./SinglePost";

const Posts = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      await axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/`,
        headers: {
          Authorization: `token ${window.localStorage.getItem('token')}`
        }
      }).then((response) => {
        // console.log(response.data);
        setPosts(response.data);
      });
    };
    getPosts();
  }, []);

  return (
    <div>
      {posts !== null ? (
        <>
          {posts.map((data) => (
            <SinglePost post={data} key={data.id} />
          ))}
        </>
      ) : (
        <h1>Posts not founded</h1>
      )}
    </div>
  );
};

export default Posts;
