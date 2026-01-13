function memoize(fn, keyResolver) {
  const cache = new Map(); // 캐시 저장소 (private)

  return function (...args) {
    // 캐시 키 생성
    const key = keyResolver ? keyResolver(...args) : JSON.stringify(args);

    // 캐시에 있으면 바로 반환
    if (cache.has(key)) {
      return cache.get(key);
    }

    // 없으면 계산
    const result = fn(...args);

    // 캐시에 저장
    cache.set(key, result);

    return result;
  };
}

const slowMultiply = (a, b) => {
  console.log("계산 중...");
  return a * b;
};

const fastMultiply = memoize(slowMultiply);

console.log(fastMultiply(3, 4)); // 계산 중... 12
console.log(fastMultiply(3, 4)); // 12 (캐시)
console.log(fastMultiply(5, 6)); // 계산 중... 30
