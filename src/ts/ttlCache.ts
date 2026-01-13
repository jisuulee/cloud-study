interface Cache<K, V> {
  get(key: K): V | undefined;
  set(key: K, value: V): void;
  has(key: K): boolean;
  delete(key: K): boolean;
  clear(): void;
}

// TTL(Time To Live) 지원 캐시 구현
class TTLCache<K, V> implements Cache<K, V> {
  private cache = new Map<K, { value: V; expiresAt: number }>();

  constructor(private defaultTTL: number = 60000) {}

  // 구현하세요
  // set 시 TTL 지정 가능하도록
  private isExpired(key: K): boolean {
    const entry = this.cache.get(key);
    if (!entry) return true;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return true;
    }
    return false;
  }

  get(key: K): V | undefined {
    if (this.isExpired(key)) return undefined;
    return this.cache.get(key)!.value;
  }

  set(key: K, value: V, ttl: number = this.defaultTTL): void {
    const expiresAt = Date.now() + ttl;
    this.cache.set(key, { value, expiresAt });
  }

  has(key: K): boolean {
    return !this.isExpired(key);
  }

  delete(key: K): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

// 테스트
const cache = new TTLCache<string, number>(1000); // 1초 TTL
cache.set("key1", 100);
console.log(cache.get("key1")); // 100

setTimeout(() => {
  console.log(cache.get("key1")); // undefined (만료됨)
}, 1500);

export {};
