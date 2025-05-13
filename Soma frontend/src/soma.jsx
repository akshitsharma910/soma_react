import React from "react";
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

const Soma = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user/signup" element={<SignupPage />} />
      <Route path="/user/login" element={<LoginPage />} />
      <Route path="/user/profile" element={<ProfilePage />}/>
      <Route path="/posts/add" element={<AddPost/>}/>
      <Route path="/user/posts" element={<MyPosts/>}/>
      <Route path="/user/editProfile" element={<EditProfile/>}/>
      <Route path="/user/forgot" element={<ForgotPassword/>}/>
      <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
      <Route path="/post/:id" element={<ShowPost/>}/> 

    </Routes>
  </BrowserRouter>
);

export default Soma;