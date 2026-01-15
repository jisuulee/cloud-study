// 요구사항:
// - 상태 변경 히스토리 저장
// - Undo (이전 상태로)
// - Redo (다음 상태로)
// - 최대 10개 히스토리 유지

import { useCallback, useMemo, useState } from "react";

export function useHistoryState(initialValue) {
  const MAX = 10;

  const [state, setState] = useState({
    history: [initialValue],
    index: 0,
  });

  const value = state.history[state.index];
  const canUndo = state.index > 0;
  const canRedo = state.index < state.history.length - 1;

  const setValue = useCallback((next) => {
    setState((prev) => {
      const current = prev.history[prev.index];
      const nextValue = typeof next === "function" ? next(current) : next;

      if (Object.is(current, nextValue)) return prev;

      const base = prev.history.slice(0, prev.index + 1);
      let nextHistory = [...base, nextValue];

      if (nextHistory.length > MAX) {
        const overflow = nextHistory.length - MAX;
        nextHistory = nextHistory.slice(overflow);
      }

      return {
        history: nextHistory,
        index: nextHistory.length - 1,
      };
    });
  }, []);

  const undo = useCallback(() => {
    setState((prev) =>
      prev.index <= 0 ? prev : { ...prev, index: prev.index - 1 }
    );
  }, []);

  const redo = useCallback(() => {
    setState((prev) =>
      prev.index >= prev.history.length - 1
        ? prev
        : { ...prev, index: prev.index + 1 }
    );
  }, []);

  return useMemo(
    () => ({
      value,
      setValue,
      undo,
      redo,
      canUndo,
      canRedo,
    }),
    [value, setValue, undo, redo, canUndo, canRedo]
  );
}

// 사용 예시
function Counter() {
  const { value, setValue, undo, redo, canUndo, canRedo } = useHistoryState(0);

  return (
    <div>
      <p>값: {value}</p>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={undo} disabled={!canUndo}>
        Undo
      </button>
      <button onClick={redo} disabled={!canRedo}>
        Redo
      </button>
    </div>
  );
}
