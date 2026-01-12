function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completedCount = 0;

    // 빈 배열 처리
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value; // 순서 보장
          completedCount++;

          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err); // 하나라도 실패하면 바로 실패
        });
    });
  });
}

// 테스트
const p1 = Promise.resolve(1);
const p2 = new Promise((resolve) => setTimeout(() => resolve(2), 100));
const p3 = Promise.resolve(3);

promiseAll([p1, p2, p3]).then(console.log); // [1, 2, 3]

// 실패 케이스
promiseAll([
  Promise.resolve(1),
  Promise.reject(new Error("Failed")),
  Promise.resolve(3),
]).catch((e) => console.log(e.message)); // "Failed"
