import * as React from 'react';
import { config, interpolate } from 'react-spring/renderprops';

import { BaseAnimation } from '../BaseAnimation';
import { AnimationComponentProps } from '../../types';

export class Bounce extends React.PureComponent<AnimationComponentProps> {
  private config = {
    mass: 1,
    tension: 150,
    friction: 1,
    duration: 125,
  };

  render() {
    const { items, itemStyles, children, changedIds, ...rest } = this.props;

    return (
      <BaseAnimation
        items={items}
        config={config.gentle}
        from={{ opacity: 1 }}
        leave={{ opacity: 1 }}
        enter={({ y }) => ({ y, opacity: 1, scale: 1 })} // do not specify height in order to get "auto" value
        update={({ y, variant: { id } }) => async (next: any, stop: any) => {
          const changed = changedIds.includes(id);

          await next({ y });

          if (!changed) {
            return;
          }

          await next({ y: y - 9, config: this.config });
          await next({ y: y + 9, config: this.config });
          await next({ y, config: this.config });
        }}
        getItemOuterAnimatedStyle={({
          index,
          itemOptions: { opacity, y },
        }) => ({
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
