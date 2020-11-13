import * as React from 'react';

type FilterProps = {
  id: string;
  deviation?: number;
};

export const Filter = ({ id, deviation = 1 }: FilterProps) => {
  return (
    <svg height="0">
      <defs>
        <filter id={id} x="0" y="0">
          <feGaussianBlur in="SourceGraphic" stdDeviation={deviation} />
        </filter>
      </defs>
    </svg>
  );
};
