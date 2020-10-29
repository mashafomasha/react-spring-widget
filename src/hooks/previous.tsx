import * as React from 'react';

export function usePrevious<V>(value: V) {
  const ref = React.useRef<V>(value);

  React.useEffect(() => {
    // @ts-ignore
    ref.current = value;
  });

  return [ref.current];
}
