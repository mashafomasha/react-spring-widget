import React from 'react';
import { IVariant } from '../../types/variant';

import './styles.css';

interface IVariantProps extends IVariant {}

export const Variant = ({ id, variant }: IVariantProps) => {
  return <div className="variant">{variant}</div>;
};
