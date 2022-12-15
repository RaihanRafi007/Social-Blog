import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image1, setImage1] = useState(null);
  const [image, setImage] = useState('');
  const navegate = useNavigate()

  useEffect(() => {
    const getPost = async () => {
      await axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/${id}`,
        headers: {
          Authorization: `token ${window.localStorage.getItem("token")}`,
        },
      }).then((response) => {
        // console.log(response.data?.title);
        setTitle(response.data?.title);
        setDescription(response.data?.description);
        setImage(response.data?.image);
      });
    };
    getPost();
  }, [id]);

  const updatepost = async () => {
    let formfield = new FormData();
    formfield.append("title", title);
    formfield.append("description", description);
    if (image1 !== null) {
      formfield.append("image", image1);
    }
    await axios({
      method: "put",
      url: `http://127.0.0.1:8000/api/${id}/`,
      data: formfield,
      headers: {
        Authorization: `token ${window.localStorage.getItem("token")}`,
      },
    }).then((response) => {
    //   console.log(response.data);
    navegate('/')
    }).catch(e=>{
        // console.log(e.message);
        alert('Something is Wrong!!')
    }
    );
  };

  return (
    <div className="container">
      <h1>Update</h1>
      <div className="p-3">
        <div class="form-group">
          <label>Title</label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            class="form-control"
            value={title}
          />
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            class="form-control"
            rows="3"
            value={description}
          ></textarea>
        </div>
        <div class="form-group">
          <img className="update__image" src={image} alt="" srcset="" />
          <label>Ulpode Image</label>
          <input
            onChange={(e) => setImage1(e.target.files[0])}
            // onChange={(e) => fileSelectedHandler(e)}
            className="form-control"
            type="file"
          />
        </div>
      </div>
      <div>
        <p onClick={updatepost} className="btn btn-info">Update</p>
      </div>
    </div>
  );
};

export default UpdatePost;
