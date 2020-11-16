import * as React from 'react';

import { EVariantAnimation } from '../../enums/EVariantAnimation';
import { IVariant } from '../../types/variant';

export type TransitionItem = {
  y: number;
  key: string;
  height: number;
  variant: IVariant;
};

export type AnimationComponentProps = {
  items: TransitionItem[];
  itemStyles?: React.CSSProperties;
  changedIds: IVariant['id'][];
  renderItemContent: (variant: IVariant) => React.ReactNode;
  getItemOuterHTMLAttributes: (
    variant: IVariant
  ) => React.HTMLAttributes<HTMLDivElement> & { [data: string]: string };
};

export type AnimationComponentById = {
  [id in EVariantAnimation]: React.ComponentType<AnimationComponentProps>;
};
