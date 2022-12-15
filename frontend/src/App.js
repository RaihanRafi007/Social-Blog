import axios from "axios";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./page/Home";
import Login from "./page/Login";
import Newpost from "./page/Newpost";
import PostDetails from "./page/PostDetails";
import Profile from "./page/Profile";
import Register from "./page/Register";
import UpdatePost from "./page/UpdatePost";
import { useStateValue } from "./state/StateProvider";

const App = () => {
  const [{ profile }, dispatch] = useStateValue();
  // console.log(profile, "$$$$$$$$$$$$$$$");

  useEffect(() => {
    try {
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
    } catch {
      dispatch({
        type: "ADD_PROFILE",
        value: null,
      });
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {profile ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/:id/" element={<PostDetails />} />
              <Route path="/:id/update" element={<UpdatePost />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/newpost" element={<Newpost />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
