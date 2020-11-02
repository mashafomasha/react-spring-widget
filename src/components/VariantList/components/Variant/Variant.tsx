import React from 'react';

import { IVariant } from '../../../../types/variant';

import './styles.css';

export type VariantProps = {
  variant: IVariant;
};

export const Variant = ({ variant, ...rest }: VariantProps) => {
  return (
    <div className="variant" {...rest}>
      {variant.variant}
    </div>
  );
};
