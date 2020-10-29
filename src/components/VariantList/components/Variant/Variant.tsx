import React from 'react';
import { animated, UseTransitionResult } from 'react-spring';

import { IVariant } from '../../../../types/variant';

import './styles.css';

export type VariantProps<
  TItem extends IVariant,
  DS extends {}
> = UseTransitionResult<TItem, DS> & {
  children: React.ReactNode;
  variantKey: string;
};

export const Variant = <TItem extends IVariant, DS extends {}>({
  item,
  props,
  children,
  variantKey,
  ...rest
}: VariantProps<TItem, DS>) => {
  return (
    <animated.div style={props} className="variant" {...rest} key={variantKey}>
      {children}
    </animated.div>
  );
};
