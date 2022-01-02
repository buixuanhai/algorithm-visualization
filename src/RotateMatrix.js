import { useEffect, useMemo, useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";

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

function Steps({
  current,
  length,
  onSetStep,
  goToNext,
  goToPrev,
  goToEnd,
  goToBegin
}) {
  const steps = useMemo(() => {
    const result = [];
    for (let i = 0; i < length; i++) {
      result.push(i);
    }
    return result;
  }, [length]);
  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        Step {current} / {length - 1}
      </div>
      <div style={{ marginBottom: 10 }}>
        <button onClick={goToBegin}>
          <GrChapterPrevious />
        </button>
        <button onClick={goToPrev}>
          <FcPrevious />
        </button>
        <button onClick={goToNext}>
          <FcNext />
        </button>
        <button onClick={goToEnd}>
          <GrChapterNext />
        </button>
      </div>
      <div style={{ height: 100, width: 60, overflowY: "scroll" }}>
        {steps.map((i, index) => (
          <div
            key={index}
            onClick={() => onSetStep(i)}
            style={{
              cursor: "pointer",
              backgroundColor: i === current ? "azure" : ""
            }}
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}

function Cell({ children }) {
  const [backgroundColor, setBackgroundColor] = useState("");
  useEffect(() => {
    setBackgroundColor("#FFD39A");
    setTimeout(() => {
      setBackgroundColor("");
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
function Matrix({ matrix, title }) {
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
            <Cell key={`${index}-${colIndex}`}>{cell}</Cell>
          ));
        })}
      </div>
    </div>
  );
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
      </div>
    </div>
  );
}
