// 비순수 함수 1
let total = 0;
function addToTotal(amount) {
  total += amount;
  return total;
}

// 비순수 함수 2
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 비순수 함수 3
const config = { debug: false };
function log(message) {
  if (config.debug) {
    console.log(message);
  }
}

//TODO: 순수 함수 버전 구현
// 순수 함수 1
function addToTotalPure(total, amount) {
  return total + amount;
}

// 순수 함수 2
function shufflePure(arr, randomFn = Math.random) {
  const newArr = [...arr]; // 원본 복사

  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(randomFn() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  return newArr;
}

// 순수 함수 3
function logPure(message, debug) {
  if (!debug) return null;
  return message;
}
