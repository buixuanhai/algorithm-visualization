import { useMemo, useState } from "react";
import { Steps, Matrix } from "./components";

function rotate(originalMatrix, onStep) {
  const matrix = JSON.parse(JSON.stringify(originalMatrix));
  const length = matrix.length;

  for (let r = 0; r < Math.floor(length / 2); r++) {
    for (let c = 0; c < Math.floor(length / 2) + (length % 2); c++) {
      const temp = matrix[r][c];
      matrix[r][c] = matrix[length - c - 1][r];
      onStep(matrix);
      matrix[length - c - 1][r] = matrix[length - r - 1][length - c - 1];
      onStep(matrix);
      matrix[length - r - 1][length - c - 1] = matrix[c][length - r - 1];
      onStep(matrix);
      matrix[c][length - r - 1] = temp;
      onStep(matrix);
    }
  }
}

function calculateSteps(matrix) {
  const result = [matrix];
  rotate(matrix, (data) => {
    result.push(JSON.parse(JSON.stringify(data)));
  });
  return result;
}

function initializeMatrix(size) {
  const matrix = [];
  let count = 1;
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(count++);
    }
    matrix.push(row);
  }
  return matrix;
}

export default function RotateMatrix() {
  const [step, setStep] = useState(0);
  const [size, setSize] = useState(3);

  const state = useMemo(() => {
    return calculateSteps(initializeMatrix(size));
  }, [size]);

  return (
    <div>
      <div style={{ display: "flex", marginBottom: 10 }}>
        <Matrix title="Original" matrix={state[0]} />
        <Matrix title="Transformed" matrix={state[step]} />
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
