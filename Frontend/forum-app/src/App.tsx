import NavBar from "./components/Nav";
import Posts from "./pages/Posts.tsx";
import Home from "./pages/Home.tsx";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
