import Cell from "./Cell";

export default function Matrix({ matrix, title }) {
  const length = matrix.length;
  return (
    <div>
      <p style={{ textAlign: "center" }}>{title}</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${length}, 40px)`,
          gridTemplateRows: `repeat(${length}, 40px)`,
          marginRight: 10
        }}
      >
        {matrix.map((row, index) => {
          return row.map((cell, colIndex) => (
            <Cell
              value={cell?.value}
              color={cell?.color}
              key={`${index}-${colIndex}`}
            >
              {cell?.value ? cell?.value : cell}
            </Cell>
          ));
        })}
      </div>
    </div>
  );
}
