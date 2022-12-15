import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const loginnow = async () => {
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/login/",
      data: {
        username: username,
        password: password,
      },
    })
      .then((response) => {
        // console.log(response.data['token'], "&&& Login Page");
        window.localStorage.setItem("token", response.data["token"]);
        window.location.href = '/'
      })
      .catch((e) => {
        alert("Your Password or Username is Unvalid");
      });
  };

  return (
    <div className="container">
      <div class="content-section">
        <fieldset class="form-group">
          <legend class="border-bottom mb-4">Log In</legend>
          <div>
            <div class="form-group">
              <label>Username</label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                class="form-control"
                placeholder="Username"
              />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                class="form-control"
                placeholder="Password"
              />
            </div>
          </div>
        </fieldset>
        <div class="form-group">
          <p onClick={loginnow} class="btn btn-outline-info">
            Login
          </p>
        </div>
        <div class="border-top pt-3">
          <small class="text-muted">
            Need An Account?
            <Link class="ml-2" to="/register/">
              SignIn Up Now
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
