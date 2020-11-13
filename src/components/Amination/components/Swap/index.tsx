import * as React from 'react';
import { config, interpolate } from 'react-spring/renderprops';

import { BaseAnimation } from '../BaseAnimation';
import { AnimationComponentProps } from '../../types';

export class Swap extends React.PureComponent<AnimationComponentProps> {
  render() {
    const { items, itemStyles, changedIds, children, ...rest } = this.props;

    return (
      <BaseAnimation
        items={items}
        config={config.wobbly}
        from={{ opacity: 0 }}
        leave={{ opacity: 0 }}
        enter={({ y }) => ({ y, opacity: 1 })}
        update={({ y }) => ({ y })}
        getItemAnimatedDivStyle={({ index, itemOptions: { opacity, y } }) => ({
          ...itemStyles,
          opacity,
          zIndex: items.length - index,
          transform: interpolate(
            [y.interpolate((y: number) => `translateY(${y}px)`)],
            (translateY) => `${translateY}`
          ),
        })}
        {...rest}
      />
    );
  }
}
