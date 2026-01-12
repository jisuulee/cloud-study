function createContainer() {
  const services = new Map(); // 일반 서비스 팩토리
  const singletons = new Map(); // 싱글톤 팩토리
  const instances = new Map(); // 싱글톤 인스턴스 캐시

  return {
    register(name, factory) {
      services.set(name, factory);
    },

    singleton(name, factory) {
      singletons.set(name, factory);
    },

    resolve(name) {
      // 싱글톤이면 이미 만든 인스턴스 반환
      if (instances.has(name)) {
        return instances.get(name);
      }

      // 싱글톤 등록된 경우
      if (singletons.has(name)) {
        const instance = singletons.get(name)(this.resolve.bind(this));
        instances.set(name, instance);
        return instance;
      }

      // 일반 서비스
      if (services.has(name)) {
        return services.get(name)(this.resolve.bind(this));
      }

      // 없으면 에러
      throw new Error(`Service not found: ${name}`);
    },
  };
}

// 테스트
const container = createContainer();

// 일반 등록 (매번 새 인스턴스)
container.register("logger", () => ({
  log: (msg) => console.log(`[LOG]${msg}`),
}));

// 싱글톤 등록
container.singleton("config", () => ({
  apiUrl: "https://api.example.com",
  timeout: 5000,
}));

// 의존성 있는 서비스
container.register("apiClient", (resolve) => ({
  config: resolve("config"),
  logger: resolve("logger"),
  fetch: function (path) {
    this.logger.log(`Fetching${this.config.apiUrl}${path}`);
  },
}));

const client = container.resolve("apiClient");
client.fetch("/users");
// [LOG] Fetching https://api.example.com/users
