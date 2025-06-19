import NavBar from "./components/NavBar.tsx";
import Posts from "./pages/Posts.tsx";
import Home from "./pages/Home.tsx";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/liked-posts" element={<Home />} />
          <Route path="/your-posts" element={<Home />} />
          <Route path="/your-comments" element={<Home />} />
          <Route path="/login" element={<Home />} />
          <Route path="/register" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
