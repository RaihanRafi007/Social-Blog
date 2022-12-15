import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);

  const navigate = useNavigate();

  const registernow = () => {
    if (password === password2) {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/register/",
        data: {
          username: username,
          password: password,
        },
      })
        .then((response) => {
          // console.log(response.data);
          alert("User got created successfully!!");
          navigate("/login");
        })
        .catch((e) => {
          alert("Something is wrong!!");
        });
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <div className="container">
      <div class="content-section">
        <fieldset class="form-group">
          <legend class="border-bottom mb-4">Register Now</legend>
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

            <div class="form-group">
              <label>Confirm Password</label>
              <input
                onChange={(e) => setPassword2(e.target.value)}
                type="password"
                class="form-control"
                placeholder="Password"
              />
            </div>
          </div>
        </fieldset>
        <div class="form-group">
          <p class="btn btn-outline-info" onClick={registernow}>
            Register
          </p>
        </div>
        <div class="border-top pt-3">
          <small class="text-muted">
            Have An Account?
            <Link class="ml-2" to="/">
              SignIn In Now
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
