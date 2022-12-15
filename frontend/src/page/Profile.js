import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../state/StateProvider";

const Profile = () => {
  const [{ profile }, dispatch] = useStateValue();
  const [firstname, setFirstname] = useState(profile?.user.first_name);
  const [lastname, setLastname] = useState(profile?.user.last_name);
  const [email, setEmail] = useState(profile?.user.email);
  const [image, setImage] = useState(null);
  const [reload, setReload] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      await axios({
        method: "get",
        url: "http://127.0.0.1:8000/profile/",
        headers: {
          Authorization: `token ${window.localStorage.getItem("token")}`,
        },
      }).then((response) => {
        // console.log(response.data);
        dispatch({
          type: "ADD_PROFILE",
          value: response.data["userdata"],
        });
      });
    };
    getProfile();
  }, [reload, dispatch]);

  const userdataupdate = async () => {
    await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/userdataupdate/",
      data: {
        first_name: firstname,
        last_name: lastname,
        email: email,
      },
      headers: {
        Authorization: `token ${window.localStorage.getItem("token")}`,
      },
    }).then((response) => {
      console.log(response.data);
      setReload(response.data);
    });
  };

  const updateImage = async () => {
    let formfile = new FormData();
    formfile.append("image", image);
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/profileupdate/",
      data: formfile,
      headers: {
        Authorization: `token ${window.localStorage.getItem("token")}`,
      },
    }).then((response) => {
      // console.log(response.data);
      setReload(response.data)
    });
  };

  return (
    <div className="container">
      <div>
        <div class="content-section">
          <div class="media">
            <img
              class="rounded-circle account-img"
              src={`http://127.0.0.1:8000${profile?.image}`}
              alt="Hello"
            />
            <div class="media-body">
              <h2 class="account-heading">{profile?.user.username}</h2>
              <small class="form-text text-muted">Username name is Fiexd</small>
              <p class="text-secondary">{profile?.user.email}</p>
              <p>
                {profile?.user.first_name} {profile?.user.last_name}
              </p>
            </div>
          </div>
          <form method="POST" enctype="multipart/form-data">
            <fieldset class="form-group">
              <legend class="border-bottom mb-4">Profile Info</legend>
              <div class="form-group">
                <label>Uplode Profile Picture</label>
                <div class="row">
                  <div class="col">
                    <input
                      onChange={(e) => setImage(e.target.files[0])}
                      type="file"
                      class="form-control"
                    />
                  </div>
                  <div class="col">
                    <p onClick={updateImage} className="btn btn-info">
                      Upload
                    </p>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
                />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                  type="email"
                  class="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </fieldset>
            <div class="form-group">
              <p class="btn btn-outline-info" onClick={userdataupdate}>
                Update
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
