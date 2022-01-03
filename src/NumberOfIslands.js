import { useMemo, useState } from "react";
import { Steps, Matrix } from "./components";
import randomColor from "randomcolor";

function initializeMatrix(size) {
  const matrix = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(Math.round(Math.random()));
    }
    matrix.push(row);
  }
  return matrix;
}

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1]
];

function countIslands(original) {
  const matrix = JSON.parse(JSON.stringify(original));
  let next = 1;
  let color;
  const states = [original];
  function dfs(rowIndex, colIndex) {
    if (
      rowIndex < 0 ||
      rowIndex >= matrix.length ||
      colIndex < 0 ||
      colIndex >= matrix[0].length ||
      matrix[rowIndex][colIndex] !== 1
    ) {
      return;
    }

    matrix[rowIndex][colIndex] = { value: next, color };

    for (const [r, c] of directions) {
      const newRow = r + rowIndex;
      const newCol = c + colIndex;
      dfs(newRow, newCol);
    }
  }

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    for (let colIndex = 0; colIndex < matrix.length; colIndex++) {
      if (matrix[rowIndex][colIndex] === 1) {
        next++;
        color = randomColor();
        dfs(rowIndex, colIndex);
        states.push(JSON.parse(JSON.stringify(matrix)));
      }
    }
  }

  return states;
}

export default function NumberOfIslands() {
  const [step, setStep] = useState(0);
  const [size, setSize] = useState(10);

  const state = useMemo(() => {
    return countIslands(initializeMatrix(size));
  }, [size]);

  return (
    <div>
      <div style={{ display: "flex", marginBottom: 10 }}>
        <Matrix matrix={state[step]} />
      </div>
      <div>
        <div style={{ marginBottom: 10 }}>
          <label style={{ paddingRight: 10 }}>Matrix size</label>
          <input
            type="number"
            min={0}
            max={20}
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
              setStep(0);
            }}
          />
        </div>
        <Steps
          goToNext={() => {
            if (step < state.length - 1) {
              setStep((prev) => prev + 1);
            }
          }}
          goToPrev={() => {
            setStep((prev) => {
              if (prev > 0) {
                return prev - 1;
              }
              return prev;
            });
          }}
          goToEnd={() => {
            setStep(state.length - 1);
          }}
          goToBegin={() => {
            setStep(0);
          }}
          current={step}
          length={state.length}
          onSetStep={(i) => setStep(i)}
        />
      </div>
    </div>
  );
}
