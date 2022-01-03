import { useMemo } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";

export default function Steps({
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
