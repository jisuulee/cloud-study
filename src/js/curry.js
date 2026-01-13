function curry(fn) {
  if (arguments.length >= fn.length) {
    return fn(...args);
  }

  return function (...nextARgs) {
    return curriedAdd(...args, ...nextARgs);
  };
}

// 테스트
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
console.log(curriedAdd(1, 2, 3)); // 6

// 활용
const addOne = curriedAdd(1);
const addOneAndTwo = addOne(2);
console.log(addOneAndTwo(10)); // 13
