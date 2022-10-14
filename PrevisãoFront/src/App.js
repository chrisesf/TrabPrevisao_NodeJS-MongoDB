import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import './index.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/cities" element={<Cities />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
