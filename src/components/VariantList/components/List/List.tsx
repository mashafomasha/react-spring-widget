import * as React from 'react';

import { IVariant } from '../../../../types/variant';
import { AnimationComponentProps } from '../../../Amination/types';

const styles = {
  outer: { position: 'relative', width: '100%', height: '100%' },
  inner: {
    position: 'absolute',
    willChange: 'transform, height, opacity',
    width: '100%',
  },
} as const;

type ListProps = {
  items: IVariant[];

  keys: (item: IVariant) => IVariant['id'];
  heights: (item: IVariant) => number;
  children: (item: IVariant) => React.ReactNode;

  Animation: React.ComponentType<AnimationComponentProps>;
};

export class List extends React.PureComponent<ListProps> {
  render() {
    const { children, items, keys, heights, Animation, ...rest } = this.props;
    let totalHeight = 0;

    const displayData = items.map((variant) => {
      const y = totalHeight;
      const height = heights(variant);
      totalHeight += height;
      return { y, height, key: keys(variant), variant };
    });

    return (
      <div style={{ ...styles.outer, height: totalHeight }} {...rest}>
        <Animation
          items={displayData}
          itemStyles={styles.inner}
          renderItemContent={(variant) => children(variant)}
          getItemHTMLAttributes={(variant) => ({
            'data-variant-id': variant.id,
          })}
        />
      </div>
    );
  }
}
