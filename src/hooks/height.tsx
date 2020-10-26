import * as React from 'react';
import { ResizeObserver } from 'resize-observer';

export const useHeight = (
  { on = true /* no value means on */ } = {} as any
) => {
  const ref = React.useRef<any>();
  const [height, setHeight] = React.useState(0);
  const heightRef = React.useRef(height);

  const [observer] = React.useState(
    () =>
      new ResizeObserver((packet) => {
        if (ref.current && heightRef.current !== ref.current.offsetHeight) {
          heightRef.current = ref.current.offsetHeight;
          setHeight(ref.current.offsetHeight);
        }
      })
  );

  React.useLayoutEffect(() => {
    if (on && ref.current) {
      setHeight(ref.current.offsetHeight);
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [on, observer]);

  return [ref, height as any];
};
