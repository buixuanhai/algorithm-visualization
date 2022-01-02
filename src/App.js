import RotateMatrix from "./RotateMatrix";
import { Routes, Route, Link } from "react-router-dom";

function Home() {
  return <div>Algorithms visualization</div>;
}
export default function App() {
  return (
    <div style={{ display: "flex" }}>
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
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rotateMatrix" element={<RotateMatrix />} />
      </Routes>
    </div>
  );
}
