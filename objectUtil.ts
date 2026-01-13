// 객체에서 특정 키들만 선택
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    result[key] = obj[key];
  }

  return result;
}

// 객체에서 특정 키들 제외
function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const keySet = new Set<keyof T>(keys as readonly (keyof T)[]);
  const result = {} as Omit<T, K>;

  for (const key in obj) {
    if (!keySet.has(key as keyof T)) {
      (result as any)[key] = obj[key as keyof T];
    }
  }

  return result;
}

// 객체 속성 값 변경 (타입 안전)
function updateProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): T {
  // 불변성 유지하며 구현
  return { ...obj, [key]: value };
}

// 테스트
const user = { id: 1, name: "Kim", email: "kim@test.com", age: 25 };

const picked = pick(user, ["id", "name"]);
// { id: 1, name: "Kim" }

const omitted = omit(user, ["email"]);
// { id: 1, name: "Kim", age: 25 }

const updated = updateProperty(user, "age", 26);
// { id: 1, name: "Kim", email: "kim@test.com", age: 26 }
