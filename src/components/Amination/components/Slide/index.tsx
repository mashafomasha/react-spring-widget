import * as React from 'react';
import { config, interpolate } from 'react-spring/renderprops';

import { BaseAnimation } from '../BaseAnimation';
import { AnimationComponentProps } from '../../types';

export class Slide extends React.PureComponent<AnimationComponentProps> {
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
        config={config.wobbly}
        from={{ opacity: 1 }}
        leave={{ opacity: 1 }}
        enter={({ y }) => ({ y, opacity: 1, x: 0 })} // do not specify height in order to get "auto" value
        update={({ y, variant: { id } }) => async (next: any, stop: any) => {
          const changed = changedIds.includes(id);

          if (!changed) {
            await next({ y });
            return;
          }

          await next({ x: -100, config: this.config });
          await next({ y });
          await next({ x: 0, config: this.config });
        }}
        getItemAnimatedDivStyle={({
          index,
          itemOptions: { opacity, y, x },
        }) => ({
          ...itemStyles,
          opacity,
          zIndex: items.length - index,
          transform: interpolate(
            [
              y.interpolate((y: number) => `translateY(${y}px)`),
              x.interpolate((x: number) => `translateX(${x}%)`),
            ],
            (translateX, translateY) => `${translateX} ${translateY}`
          ),
        })}
        {...rest}
      />
    );
  }
}
