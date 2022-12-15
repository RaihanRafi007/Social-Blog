import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Newpost = () => {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [image, setImage] = useState(null);
  const navegate = useNavigate();

  const addNewPost = async () => {
    let formfield = new FormData();
    formfield.append("title", title);
    formfield.append("description", content);
    if (image !== null) {
      formfield.append("image", image);
    }
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/",
      data: formfield,
      headers: {
        Authorization: `token ${window.localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        //   console.log(response.data);
        navegate("/");
      })
      .catch((e) => {
        alert("Something is wrong!!");
      });
  };

  return (
    <div className="container">
      <div class="form-group">
        <label>Title</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          class="form-control"
          placeholder="Post title"
        />
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          placeholder="Description"
          class="form-control"
          rows="3"
        ></textarea>
      </div>
      <div class="form-group">
        <label>Image</label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          class="form-control"
        />
      </div>
      <p className="btn btn-info my-2" onClick={addNewPost}>
        New Post
      </p>
    </div>
  );
};

export default Newpost;
