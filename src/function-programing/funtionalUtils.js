//TODO: 구현하세요

function myMap(arr, fn) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i], i, arr));
  }

  return result;
}

function myFilter(arr, predicate) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }

  return result;
}

function myReduce(arr, reducer, initialValue) {
  let acc = initialValue;

  for (let i = 0; i < arr.length; i++) {
    acc = reducer(acc, arr[i], i, arr);
  }

  return acc;
}

function myFind(arr, predicate) {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      return arr[i];
    }
  }

  return undefined;
}

function myEvery(arr, predicate) {
  for (let i = 0; i < arr.length; i++) {
    if (!predicate(arr[i], i, arr)) {
      return false;
    }
  }

  return true;
}

function mySome(arr, predicate) {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      return true;
    }
  }

  return false;
}

// 테스트
const nums = [1, 2, 3, 4, 5];

console.log(myMap(nums, (x) => x * 2)); // [2, 4, 6, 8, 10]
console.log(myFilter(nums, (x) => x % 2 === 0)); // [2, 4]
console.log(myReduce(nums, (a, b) => a + b, 0)); // 15
console.log(myFind(nums, (x) => x > 3)); // 4
console.log(myEvery(nums, (x) => x > 0)); // true
console.log(mySome(nums, (x) => x > 4)); // true
