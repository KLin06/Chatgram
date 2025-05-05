import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import { useSessionStore } from "./store/useSessionStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import MyPostsPage from "./pages/MyPostsPage";
import UserPostsPage from "./pages/UserPostsPage";

const App = () => {
  const { sessionUser, isCheckingAuth, checkAuth } = useSessionStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !sessionUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme="cupcake">
      <NavBar />

      <div className="w-full h-[calc(100vh-4.5rem)] mt-[4.5rem]">
        <Routes>
          <Route path="/" element={sessionUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/chat" element={sessionUser ? <ChatPage /> : <Navigate to="/login" />} />
          <Route path="/myposts" element={sessionUser ? <MyPostsPage /> : <Navigate to="/login" />} />
          <Route path={`/posts/:userid`} element={sessionUser ? <UserPostsPage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={sessionUser ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!sessionUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!sessionUser ? <LoginPage /> : <Navigate to="/" />} />
        </Routes>
      </div>

      <Toaster />
    </div>
  );
};

export default App;
