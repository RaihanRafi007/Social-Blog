import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../state/StateProvider";

const Navbar = () => {
  const [{ profile }] = useStateValue();
  const logoutnow = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="site-header">
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand mr-4" to="/">
            Django Blog
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav ">
              {profile ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-light"
                      aria-current="page"
                      to="/newpost"
                    >
                      New Post
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link class="nav-link text-light" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-light" onClick={logoutnow}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
