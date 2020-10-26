import React from 'react';

interface IVariantProps {
  id: string;
  variant: string;
}
export const Variant = ({ id, variant }: IVariantProps) => {
  return <div className="variant">{variant}</div>;
};
