function createMemoizedFibonacci() {
  const cache = {}; // 계산 결과를 저장할 상자

  function fib(n) {
    // 이미 계산한 적 있으면 바로 꺼내기
    if (cache[n] !== undefined) {
      return cache[n];
    }

    // 가장 작은 문제
    if (n <= 1) {
      return n;
    }

    // 계산 + 저장
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  }

  return fib; // fib 함수만 외부로 공개
}
