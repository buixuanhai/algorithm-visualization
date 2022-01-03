import { useEffect, useState } from "react";

export default function Cell({ children, color, value }) {
  const [backgroundColor, setBackgroundColor] = useState("");
  useEffect(() => {
    setBackgroundColor("#FFD39A");
    setTimeout(() => {
      setBackgroundColor(color);
    }, 500);
  }, [children]);
  return (
    <div
      style={{
        border: "1px solid",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor
      }}
    >
      {children}
    </div>
  );
}
