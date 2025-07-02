import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/NavBar.tsx";
import Posts from "./pages/Posts.tsx";
import Home from "./pages/Home.tsx";
import YourPosts from "./pages/YourPosts.tsx";
import YourComments from "./pages/YourComments.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import PostDetail from "./pages/PostDetail.tsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:pk" element={<PostDetail />} />
          <Route path="/your-posts" element={<YourPosts />} />
          <Route path="/your-comments" element={<YourComments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
