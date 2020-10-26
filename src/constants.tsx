import React from 'react';
import { loremIpsum } from 'lorem-ipsum';

import { EVariantAnimation } from './enums/EVariantAnimation';

export const data = new Array(Math.floor(Math.random() * 20) + 20)
  .fill(0)
  .map((_, idx) => {
    const voteVariant = {
      id: `f${(+new Date() + idx).toString(16)}`,
      variant: loremIpsum({
        count: 2,
        format: 'plain',
        sentenceLowerBound: 5,
        sentenceUpperBound: 15,
        paragraphLowerBound: 2,
        paragraphUpperBound: 7,
        units: 'sentences',
      }),
    };

    return voteVariant;
  });

export const options: {
  value: EVariantAnimation;
  label: React.ReactNode;
}[] = [
  { value: EVariantAnimation.A, label: EVariantAnimation.A },
  { value: EVariantAnimation.B, label: EVariantAnimation.B },
  { value: EVariantAnimation.C, label: EVariantAnimation.C },
  { value: EVariantAnimation.D, label: EVariantAnimation.D },
];
