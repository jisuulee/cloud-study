// 함수 타입 속성만 추출
type FunctionProps<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K];
};

// 함수가 아닌 속성만 추출
type NonFunctionProps<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? never : K]: T[K];
};

// nullable 속성만 옵셔널로 변경
type NullableToOptional<T> = {
  [K in keyof T as undefined extends T[K]
    ? K
    : null extends T[K]
    ? K
    : never]?: Exclude<T[K], null | undefined>;
} & {
  [K in keyof T as undefined extends T[K]
    ? never
    : null extends T[K]
    ? never
    : K]: T[K];
};

// 테스트
type Mixed = {
  name: string;
  age: number;
  greet: () => void;
  calculate: (x: number) => number;
};

type OnlyFunctions = FunctionProps<Mixed>;
// { greet: () => void; calculate: (x: number) => number }

type OnlyData = NonFunctionProps<Mixed>;
// { name: string; age: number }

export {};
