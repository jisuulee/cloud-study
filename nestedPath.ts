// 점 표기법으로 중첩 객체 값 가져오기
type NestedKeyOf<T> = T extends object
  ? {
      [K in Extract<keyof T, string>]: T[K] extends object
        ? K | `${K}.${NestedKeyOf<T[K]>}`
        : K;
    }[Extract<keyof T, string>]
  : never;

type PathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathValue<T[K], Rest>
    : never
  : P extends keyof T
  ? T[P]
  : never;

function getNestedValue<T, K extends string>(obj: T, path: K): PathValue<T, K> {
  // path를 "."으로 분리하여 값 접근
  const keys = (path as string).split(".");
  let current: any = obj;

  for (const key of keys) {
    current = current?.[key];
  }

  return current as PathValue<T, K>;
}

// 테스트
const data = {
  user: {
    profile: {
      name: "Kim",
      address: {
        city: "Seoul",
      },
    },
  },
};

const name = getNestedValue(data, "user.profile.name"); // "Kim"
const city = getNestedValue(data, "user.profile.address.city"); // "Seoul"

export {};
