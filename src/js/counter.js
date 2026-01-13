function createCounter(initialValue = 0) {
  const _iniVal = initialValue; // 초기값 보존
  let value = _iniVal; // 현재 값 (클로저 변수)

  return {
    increment: () => {
      value = value + 1;
      return value;
    },

    decrement: () => {
      value = value - 1;
      return value;
    },

    reset: () => {
      value = _iniVal;
    },

    getValue: () => {
      return value;
    },
  };
}

// 테스트
const counter = createCounter(10);
const counter2 = createCounter(10);

console.log(counter.increment()); // 11
console.log(counter.increment()); // 12
console.log(counter.decrement()); // 11
console.log(counter.getValue()); // 11
counter.reset();
console.log(counter.getValue()); // 10

console.log(counter2.increment()); // 11 (counter랑 완전히 독립)
