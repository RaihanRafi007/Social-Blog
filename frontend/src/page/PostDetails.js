import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useStateValue } from "../state/StateProvider";

const PostDetails = () => {
  const [{ profile }, dispatch] = useStateValue();
  // console.log(profile?.user["id"]);
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navegate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      await axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/${id}`,
        headers: {
          Authorization: `token ${window.localStorage.getItem("token")}`,
        },
      }).then((response) => {
        // console.log(response.data);
        setPost(response.data);
      });
    };
    getPost();
  }, [id]);

  const deletePost = async () => {
    await axios({
      method: "DELETE",
      url: `http://127.0.0.1:8000/api/${id}`,
      headers: {
        Authorization: `token ${window.localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
          // console.log(response.data);
        navegate("/");
      })
      .catch((e) => {
        // console.log(e.message);
        alert("Something is Wrong!!");
      });
  };

  return (
    <div className="container">
      <article class="media content-section">
        <img
          class="rounded-circle article-img"
          src={`http://127.0.0.1:8000/${post?.user?.image}`}
        />
        <div class="media-body">
          <div class="article-metadata">
            <a class="me-2" href="">
              {post?.user?.user?.username}
            </a>
            <small class="text-muted">{post?.date}</small>
            {profile?.id === post?.user?.id && (
              <div>
                <Link
                  class="btn btn-secondary btn-sm mt-1 mb-1"
                  to={`/${post?.id}/update/`}
                >
                  Update
                </Link>
                <Link
                  onClick={deletePost}
                  class="btn btn-danger btn-sm mt-1 mb-1"
                >
                  Delete
                </Link>
              </div>
            )}
          </div>
          <h2 class="article-title">{post?.title}</h2>
          <img className="article_content_image" src={post?.image} alt="" />
          <p class="article-content">{post?.description}</p>
        </div>
      </article>
    </div>
  );
};

export default PostDetails;

// <div className="container">
//       <article className="media content-section">
//         <img
//           className="rounded-circle article-img"
//           src={`http://127.0.0.1:8000/${post.user.image}`}
//           alt={post?.title}
//         />
//         <div className="media-body">
//           <div className="article-metadata">
//             <a className="me-2" href="/">
//               {post?.user?.user?.username}
//             </a>
//             <small className="text-muted">post?.date</small>
//             {/* {
//                     profile?.id === post?.user?.id && (
//                         <div>
//                             <Link class="btn btn-secondary btn-sm mt-1 mb-1" to={`/${post?.id}/update/`}>Update</Link>
//                             <Link class="btn btn-danger btn-sm mt-1 mb-1" onClick={() => delateData(post?.id)}>Delete</Link>
//                         </div>
//                     )
//                 } */}
//           </div>
//           <h2 className="article-title">{post?.title}</h2>
//           <img
//             className="article_content_image"
//             src={post.image}
//             alt={post?.title}
//           />
//           <p className="article-content">{post?.description}</p>
//         </div>
//       </article>
//     </div>
