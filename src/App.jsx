import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Reader from "./pages/Reader";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path="/reader/:id" element={<Reader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
