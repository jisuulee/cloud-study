// 에러 1
const user = {
  name: "Kim",
  age: 25,
  email: "kim@test.com",
};

// 에러 2
function double(value: number): number {
  return value * 2;
}

// 에러 3
const numbers = [1, 2, 3];
numbers.push(4);

// 에러 4
function greet(name: string, age: number) {
  return `Hello, ${name}. You are ${age} years old.`;
}
greet("Kim", 25);

// 에러 5
const config = {
  port: 3000,
  host: "localhost",
};
config.port = 3001;

export {};
