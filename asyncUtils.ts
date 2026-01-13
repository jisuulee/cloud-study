//TODO: 다음 함수들을 타입 안전하게 구현하세요
type Handler<E> = (event: E) => void;
// 1. 비동기 맵 함수
async function asyncMap<T, U>(
  items: T[],
  callback: (item: T, index: number) => Promise<U>
): Promise<U[]> {
  return Promise.all(items.map((item, index) => callback(item, index)));
}

// 2. 이벤트 에미터 타입
interface EventMap {
  click: { x: number; y: number };
  keydown: { key: string; code: string };
  submit: { data: Record<string, string> };
}

class TypedEventEmitter<T extends object> {
  //TODO: on, off, emit 메서드 구현
  private listeners: {
    [K in keyof T]?: Set<Handler<T[K]>>;
  } = {};

  on<K extends keyof T>(type: K, handler: Handler<T[K]>): void {
    (this.listeners[type] ??= new Set()).add(handler);
  }

  off<K extends keyof T>(type: K, handler: Handler<T[K]>): void {
    this.listeners[type]?.delete(handler);
    // (선택) 비면 정리하고 싶으면 아래도 가능:
    // if (this.listeners[type]?.size === 0) delete this.listeners[type];
  }

  emit<K extends keyof T>(type: K, event: T[K]): void {
    this.listeners[type]?.forEach((handler) => handler(event));
  }
}

// 테스트
const emitter = new TypedEventEmitter<EventMap>();

emitter.on("click", (event) => {
  console.log(event.x, event.y); // 타입 추론됨
});

emitter.emit("keydown", { key: "Enter", code: "Enter" });
emitter.emit("click", { x: 100, y: 200 });

export {};
