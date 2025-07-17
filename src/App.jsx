import { Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/reader/:id" element={<Reader />} />
        <Route></Route>
      </Routes>
    </Router>
  );
}

export default App;
