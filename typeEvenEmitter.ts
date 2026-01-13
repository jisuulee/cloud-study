type EventMap = {
  userLogin: { userId: string; timestamp: Date };
  userLogout: { userId: string };
  pageView: { path: string; referrer?: string };
  error: { message: string; code: number };
};

type Handler<E> = (data: E) => void;

class TypedEventEmitter<T extends Record<string, any>> {
  private listeners: { [K in keyof T]?: Set<Handler<T[K]>> } = {};
  private onceListeners: { [K in keyof T]?: Set<Handler<T[K]>> } = {};

  // on: 이벤트 리스너 등록
  on<K extends keyof T>(event: K, handler: Handler<T[K]>): void {
    (this.listeners[event] ??= new Set()).add(handler);
  }

  // off: 이벤트 리스너 제거
  off<K extends keyof T>(event: K, handler: Handler<T[K]>): void {
    this.listeners[event]?.delete(handler);
    this.onceListeners[event]?.delete(handler);
  }

  // once: 한 번만 실행되는 리스너
  once<K extends keyof T>(event: K, handler: Handler<T[K]>): void {
    (this.onceListeners[event] ??= new Set()).add(handler);
  }

  // emit: 이벤트 발생
  emit<K extends keyof T>(event: K, data: T[K]): void {
    this.listeners[event]?.forEach((handler) => handler(data));

    const onceSet = this.onceListeners[event];
    if (onceSet && onceSet.size > 0) {
      onceSet.forEach((handler) => handler(data));
      onceSet.clear();
    }
  }
}

// 테스트
const emitter = new TypedEventEmitter<EventMap>();

emitter.on("userLogin", (data) => {
  console.log(data.userId); // 타입 추론됨
});

emitter.emit("userLogin", {
  userId: "123",
  timestamp: new Date(),
});

// 타입 에러:
// emitter.emit("userLogin", { userId: 123 });
// emitter.emit("unknownEvent", {});

export {};
