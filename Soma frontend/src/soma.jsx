import React,{useState,useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./signup";
import LoginPage from "./login"; 
import HomePage from "./homepage"; 
import ProfilePage from "./profile";  
import AddPost from "./addpost";
import MyPosts from "./myposts";
import EditProfile from "./editprofile";
import ForgotPassword from "./forgot";
import AdminDashboard from "./admin";
import ShowPost from "./showpost";

const Soma = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/", { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.user) setCurrentUser(data.user);
      })
      .catch(() => setCurrentUser(null));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/signup" element={<SignupPage />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/user/profile" element={<ProfilePage />} />
        <Route path="/posts/add" element={<AddPost />} />
        <Route path="/user/posts" element={<MyPosts />} />
        <Route path="/user/editProfile" element={<EditProfile />} />
        <Route path="/user/forgot" element={<ForgotPassword />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/posts/:id" element={<ShowPost currentUser={currentUser} />} />
      </Routes>
    </BrowserRouter>
  );
};


export default Soma;