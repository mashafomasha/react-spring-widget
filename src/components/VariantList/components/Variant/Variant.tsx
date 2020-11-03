import React from 'react';

import { IVariant } from '../../../../types/variant';

import './styles.css';

export type VariantProps = {
  variant: IVariant;
  changed: boolean;
};

export class Variant extends React.PureComponent<VariantProps> {
  componentDidUpdate(prevProps: VariantProps) {
    const { changed } = this.props;

    if (changed) {
      // start inner animation
    }
  }

  render() {
    const { variant, changed, ...rest } = this.props;

    return (
      <div className="variant" {...rest}>
        {variant.variant}
      </div>
    );
  }
}
