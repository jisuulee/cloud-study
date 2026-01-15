import { useEffect, useRef } from "react";

function useWhyDidYouUpdate<T extends object>(name: string, props: T): void {
  const prevProps = useRef<T | null>(null);

  useEffect(() => {
    if (prevProps.current === null) {
      prevProps.current = props;
      return;
    }

    const changedProps: Record<string, { from: any; to: any }> = {};

    Object.keys(props).forEach((key) => {
      const prev = prevProps.current![key as keyof T];
      const next = props[key as keyof T];

      if (!Object.is(prev, next)) {
        changedProps[key] = { from: prev, to: next };
      }
    });

    if (Object.keys(changedProps).length > 0) {
      console.log(`[${name}] 변경된 props:`, changedProps);
    }

    prevProps.current = props;
  });
}

type Props = {
  count: number;
};

// 사용
function MyComponent(props: Props) {
  useWhyDidYouUpdate("MyComponent", props);
  // 콘솔: [MyComponent] 변경된 props: { count: { from: 1, to: 2 } }

  return <div>{props.count}</div>;
}
