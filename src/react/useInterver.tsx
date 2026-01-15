// 요구사항:
// - delay가 null이면 정지
// - delay 변경 시 즉시 반영
// - 클로저 문제 없이 항상 최신 콜백 실행

import { useEffect, useRef, useState } from "react";

function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef<() => void>(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => clearInterval(id);
  }, [delay]);
}

// 사용 예시
function Timer() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState<number | null>(1000);

  useInterval(() => {
    setCount((c) => c + 1);
  }, delay);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setDelay(delay ? null : 1000)}>
        {delay ? "정지" : "시작"}
      </button>
      <button onClick={() => setDelay((d) => (d ? d / 2 : 1000))}>
        속도 2배
      </button>
    </div>
  );
}
