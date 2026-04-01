import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProfileDetails from "./pages/ProfileDetails";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<ProfileDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;