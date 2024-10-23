import Home from "./Home";
import "./App.css";
import MoviePage from "./MoviePage";
import Error from "./Error";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie/:id" element={<MoviePage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};
export default App;
