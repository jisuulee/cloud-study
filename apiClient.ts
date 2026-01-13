//TODO: 타입 안전한 API 클라이언트 구현
type ExtractParamNames<Path extends string> =
  Path extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtractParamNames<`/${Rest}`>
    : Path extends `${string}:${infer Param}`
    ? Param
    : never;

type PathParams<Path extends string> = [ExtractParamNames<Path>] extends [never]
  ? undefined
  : { [K in ExtractParamNames<Path>]: number };

type Methods = "GET" | "POST" | "PUT" | "DELETE";

type HasMethod<Def, M extends Methods> = M extends keyof Def ? true : false;

type GetResponse<E, P extends keyof E> = E[P] extends { GET: infer R }
  ? R
  : never;
type PostBody<E, P extends keyof E> = E[P] extends { POST: infer B }
  ? B
  : never;
type PutBody<E, P extends keyof E> = E[P] extends { PUT: infer B } ? B : never;

function createApiClient<E extends Record<string, any>>(baseUrl: string) {
  const buildUrl = (path: string, params?: Record<string, number>) => {
    if (!params) return `${baseUrl}${path}`;
    let finalPath = path;
    for (const [key, value] of Object.entries(params)) {
      finalPath = finalPath.replace(
        `:${key}`,
        encodeURIComponent(String(value))
      );
    }
    return `${baseUrl}${finalPath}`;
  };

  const request = async <T>(
    method: string,
    path: string,
    params?: Record<string, number>,
    body?: unknown
  ): Promise<T> => {
    const url = buildUrl(path, params);

    const res = await fetch(url, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    if (res.status === 204) return undefined as T;

    const text = await res.text();
    return (text ? JSON.parse(text) : undefined) as T;
  };

  return {
    async get<P extends keyof E & string>(
      path: P,
      ...args: PathParams<P> extends undefined ? [] : [params: PathParams<P>]
    ): Promise<GetResponse<E, P>> {
      const params = (args[0] as any) ?? undefined;
      return request<GetResponse<E, P>>("GET", path, params);
    },

    async post<P extends keyof E & string>(
      path: P,
      body: HasMethod<E[P], "POST"> extends true ? PostBody<E, P> : never
    ): Promise<void> {
      await request<void>("POST", path, undefined, body);
    },

    async put<P extends keyof E & string>(
      path: P,
      body: HasMethod<E[P], "PUT"> extends true ? PutBody<E, P> : never,
      ...args: PathParams<P> extends undefined ? [] : [params: PathParams<P>]
    ): Promise<void> {
      const params = (args[0] as any) ?? undefined;
      await request<void>("PUT", path, params, body);
    },

    async delete<P extends keyof E & string>(
      path: P,
      ...args: PathParams<P> extends undefined ? [] : [params: PathParams<P>]
    ): Promise<void> {
      const params = (args[0] as any) ?? undefined;
      await request<void>("DELETE", path, params);
    },
  };
}
interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface ApiEndpoints {
  "/users": { GET: User[]; POST: Omit<User, "id"> };
  "/users/:id": { GET: User; PUT: Partial<User>; DELETE: void };
  "/posts": { GET: Post[]; POST: Omit<Post, "id"> };
  "/posts/:id": { GET: Post; PUT: Partial<Post>; DELETE: void };
}

// 사용
const api = createApiClient<ApiEndpoints>("https://api.example.com");

// 타입 추론이 되어야 함
const users = await api.get("/users"); // User[]
const user = await api.get("/users/:id", { id: 1 }); // User
const newUser = await api.post("/users", {
  name: "Kim",
  email: "kim@test.com",
}); // void
await api.delete("/users/:id", { id: 1 }); // void

export {};
