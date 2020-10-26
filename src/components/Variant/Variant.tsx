import React from 'react';

import './styles.css';

interface IVariantProps {
  id: string;
  variant: string;
}
export const Variant = ({ id, variant }: IVariantProps) => {
  return <div className="variant">{variant}</div>;
};
