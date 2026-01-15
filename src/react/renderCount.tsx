import { useRef } from "react";

function useRenderCount(): number {
  const count = useRef(0);

  count.current += 1;

  return count.current;
}

// 사용
function MyComponent() {
  const renderCount = useRenderCount();
  console.log(`렌더링 횟수: ${renderCount}`);

  return <div>test</div>;
}
