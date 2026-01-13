function createEventEmitter() {
  const events = new Map(); // 이벤트별 콜백 저장 (private)

  return {
    on(event, callback) {
      if (!events.has(event)) {
        events.set(event, new Set());
      }
      events.get(event).add(callback);
    },

    off(event, callback) {
      if (!events.has(event)) return;
      events.get(event).delete(callback);
    },

    emit(event, ...args) {
      if (!events.has(event)) return;
      for (const callback of events.get(event)) {
        callback(...args);
      }
    },

    once(event, callback) {
      const wrapper = (...args) => {
        callback(...args);
        this.off(event, wrapper);
      };
      this.on(event, wrapper);
    },
  };
}

// 테스트
const emitter = createEventEmitter();

const handler = (data) => console.log("Received:", data);

emitter.on("message", handler);
emitter.emit("message", "Hello"); // "Received: Hello"
emitter.emit("message", "World"); // "Received: World"

emitter.off("message", handler);
emitter.emit("message", "Silent"); // (출력 없음)

emitter.once("login", (user) => console.log("Welcome:", user));
emitter.emit("login", "Kim"); // "Welcome: Kim"
emitter.emit("login", "Lee"); // (출력 없음)
