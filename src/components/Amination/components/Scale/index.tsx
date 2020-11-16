import * as React from 'react';
import { config, interpolate } from 'react-spring/renderprops';

import { BaseAnimation } from '../BaseAnimation';
import { AnimationComponentProps } from '../../types';

export class Scale extends React.PureComponent<AnimationComponentProps> {
  private config = {
    mass: 1,
    tension: 380,
    friction: 1,
    duration: 175,
  };

  render() {
    const { items, itemStyles, changedIds, children, ...rest } = this.props;

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

          await next({ scale: 1, config: this.config });
          await next({ scale: 0.9, config: this.config });
          await next({ scale: 1.1, config: this.config });
          await next({ scale: 0.9, config: this.config });
          await next({ scale: 1, config: this.config });
        }}
        getItemOuterAnimatedStyle={({
          index,
          itemOptions: { opacity, y, scale },
        }) => ({
          ...itemStyles,
          opacity,
          zIndex: items.length - index,
          transform: interpolate(
            [
              y.interpolate((y: number) => `translateY(${y}px)`),
              scale.interpolate((s: number) => `scale(${s})`),
            ],
            (translateY, scale) => `${translateY} ${scale}`
          ),
        })}
        {...rest}
      />
    );
  }
}
