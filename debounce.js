function debounce(fn, delay) {
  let timerId = null; // private 타이머

  return function (...args) {
    // 이전 예약 취소
    if (timerId) {
      clearTimeout(timerId);
    }

    // 새로 예약
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

// 테스트
const search = debounce((query) => {
  console.log("Searching:", query);
}, 300);

search("a");
search("ab");
search("abc");
// 300ms 후 "Searching: abc" 한 번만 출력
