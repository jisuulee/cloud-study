// 타입 안전 쿼리 빌더 구현
interface QueryBuilder<S, R = S> {
  select<K extends keyof S>(...fields: K[]): QueryBuilder<S, Pick<S, K>>;
  where<K extends keyof S>(field: K, value: S[K]): QueryBuilder<S, R>;
  orderBy<K extends keyof S>(
    field: K,
    direction: "asc" | "desc"
  ): QueryBuilder<S, R>;
  limit(count: number): QueryBuilder<S, R>;
  build(): string;
}

function createQueryBuilder<S>(table: string): QueryBuilder<S, S> {
  let selectedFields: string[] | null = null;
  const whereClauses: string[] = [];
  let orderByClause: string | null = null;
  let limitClause: number | null = null;

  const builder: QueryBuilder<S, any> = {
    select(...fields) {
      selectedFields = fields.map(String);
      return builder as any;
    },

    where(field, value) {
      const formattedValue = typeof value === "string" ? `'${value}'` : value;
      whereClauses.push(`${String(field)} = ${formattedValue}`);
      return builder;
    },

    orderBy(field, direction) {
      orderByClause = `${String(field)} ${direction.toUpperCase()}`;
      return builder;
    },

    limit(count) {
      limitClause = count;
      return builder;
    },

    build() {
      const selectPart = selectedFields
        ? `SELECT ${selectedFields.join(", ")}`
        : "SELECT *";

      const fromPart = `FROM ${table}`;
      const wherePart =
        whereClauses.length > 0 ? ` WHERE ${whereClauses.join(" AND ")}` : "";
      const orderPart = orderByClause ? ` ORDER BY ${orderByClause}` : "";
      const limitPart = limitClause !== null ? ` LIMIT ${limitClause}` : "";

      return `${selectPart} ${fromPart}${wherePart}${orderPart}${limitPart}`;
    },
  };

  return builder as QueryBuilder<S, S>;
}

// 테스트
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const query = createQueryBuilder<User>("users")
  .select("id", "name")
  .where("age", 25)
  .orderBy("name", "asc")
  .limit(10)
  .build();

console.log(query);
// SELECT id, name FROM users WHERE age = 25 ORDER BY name ASC LIMIT 10

export {};
