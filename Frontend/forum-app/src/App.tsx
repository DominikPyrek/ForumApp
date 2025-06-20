import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/NavBar.tsx";
import Posts from "./pages/Posts.tsx";
import Home from "./pages/Home.tsx";
import LikedPosts from "./pages/LikedPosts.tsx";
import YourPosts from "./pages/YourPosts.tsx";
import YourComments from "./pages/YourComments.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/liked-posts" element={<LikedPosts />} />
          <Route path="/your-posts" element={<YourPosts />} />
          <Route path="/your-comments" element={<YourComments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
