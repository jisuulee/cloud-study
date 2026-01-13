// 타입 안전 상태 관리 구현
interface Store<S> {
  getState(): S;
  setState(partial: Partial<S>): void;
  subscribe(listener: (state: S) => void): () => void;

  // 선택자 - 상태의 일부만 구독
  select<R>(selector: (state: S) => R): {
    get(): R;
    subscribe(listener: (value: R) => void): () => void;
  };
}

function createStore<S extends object>(initialState: S): Store<S> {
  let state: S = { ...initialState };
  const listeners = new Set<(state: S) => void>();

  const getState = () => state;

  const setState = (partial: Partial<S>) => {
    state = { ...state, ...partial };

    listeners.forEach((l) => l(state));
  };

  const subscribe = (listener: (state: S) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const select = <R>(selector: (state: S) => R) => {
    let current = selector(state);
    const selListeners = new Set<(value: R) => void>();

    const get = () => selector(state);

    const unsubscribeFromStore = subscribe((nextState) => {
      const next = selector(nextState);
      if (!Object.is(current, next)) {
        current = next;
        selListeners.forEach((l) => l(next));
      }
    });

    const subscribeSelected = (listener: (value: R) => void) => {
      selListeners.add(listener);
      return () => {
        selListeners.delete(listener);
        if (selListeners.size === 0) {
          unsubscribeFromStore();
        }
      };
    };

    return { get, subscribe: subscribeSelected };
  };

  return { getState, setState, subscribe, select };
}

// 테스트
interface AppState {
  user: { name: string; loggedIn: boolean } | null;
  theme: "light" | "dark";
  notifications: string[];
}

const store = createStore<AppState>({
  user: null,
  theme: "light",
  notifications: [],
});

const userSelector = store.select((s) => s.user);
userSelector.subscribe((user) => {
  console.log("User changed:", user);
});

store.setState({ user: { name: "Kim", loggedIn: true } });
