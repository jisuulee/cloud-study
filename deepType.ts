type IsPlainObject<T> = T extends object
  ? T extends Function
    ? false
    : T extends readonly any[]
    ? false
    : true
  : false;

// 깊은 Readonly
type DeepReadonly<T> = T extends Function
  ? T
  : T extends readonly (infer U)[]
  ? readonly DeepReadonly<U>[]
  : IsPlainObject<T> extends true
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

// 깊은 Partial
type DeepPartial<T> = T extends Function
  ? T
  : T extends readonly (infer U)[]
  ? DeepPartial<U>[]
  : IsPlainObject<T> extends true
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

// 깊은 Required
type DeepRequired<T> = T extends Function
  ? T
  : T extends readonly (infer U)[]
  ? DeepRequired<U>[]
  : IsPlainObject<T> extends true
  ? { [K in keyof T]-?: DeepRequired<T[K]> }
  : T;

// 중첩 객체 평탄화 (키는 점 표기법)
type FlattenObject<T, P extends string = ""> = IsPlainObject<T> extends true
  ? {
      [K in Extract<keyof T, string>]: IsPlainObject<T[K]> extends true
        ? FlattenObject<T[K], P extends "" ? K : `${P}.${K}`>
        : { [Key in P extends "" ? K : `${P}.${K}`]: T[K] };
    }[Extract<keyof T, string>] extends infer U
    ? { [K in keyof U]: U[K] }
    : never
  : {};

// 테스트
type Nested = {
  a: {
    b: {
      c: number;
    };
    d: string;
  };
  e: boolean;
};

type H = DeepReadonly<Nested>;
// 모든 중첩 속성이 readonly

type I = FlattenObject<Nested>;
// { "a.b.c": number; "a.d": string; e: boolean }

export {};
