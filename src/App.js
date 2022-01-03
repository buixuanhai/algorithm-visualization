import { Routes, Route, Link } from "react-router-dom";
import RotateMatrix from "./RotateMatrix";
import NumberIslands from "./NumberOfIslands";

function Home() {
  return <div>Algorithms visualization</div>;
}
export default function App() {
  return (
    <div style={{ display: "flex", maxWidth: 1000, margin: "auto" }}>
      <div
        style={{ paddingRight: 20, marginRight: 20, borderRight: "1px solid" }}
      >
        <p>
          <Link to="/">Algorithm list</Link>
        </p>
        <ul>
          <li>
            <Link to="/rotateMatrix">Rotate matrix</Link>
          </li>
          <li>
            <Link to="/numberIslands">Number of islands</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rotateMatrix" element={<RotateMatrix />} />
        <Route path="/numberIslands" element={<NumberIslands />} />
      </Routes>
    </div>
  );
}
