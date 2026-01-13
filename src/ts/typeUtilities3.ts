// 함수의 첫 번째 매개변수 타입
type FirstParam<T> = T extends (a: infer A, ...args: any[]) => any ? A : never;

// 생성자의 인스턴스 타입
type InstanceOf<T> = T extends new (...args: any[]) => infer R ? R : never;

// 배열(튜플)의 마지막 요소 타입
type LastElement<T> = T extends [...infer _, infer Last] ? Last : never;

// 객체의 값 타입 유니온
type ValueOf<T> = T extends object ? T[keyof T] : never;

// 테스트
type K = FirstParam<(a: string, b: number) => void>; // string
type L = InstanceOf<typeof Date>; // Date
type M = LastElement<[1, 2, 3]>; // 3
type N = ValueOf<{ a: string; b: number }>; // string | number

export {};
