import * as React from 'react';
import { config } from 'react-spring/renderprops';

import { BaseAnimation } from '../BaseAnimation';
import { AnimationComponentProps } from '../../types';

export class Rotate extends React.PureComponent<AnimationComponentProps> {
  render() {
    const { items, itemStyles, changedIds, children, ...rest } = this.props;

    return (
      <BaseAnimation
        items={items}
        config={config.wobbly}
        from={{ opacity: 0 }}
        leave={{ opacity: 0 }}
        enter={({ y }) => ({ y, opacity: 1, rotation: 0 })}
        update={({ y, variant: { id } }) => async (next: any, stop: any) => {
          const changed = changedIds.includes(id);

          if (!changed) {
            await next({ y });
            return;
          }

          await next({
            rotation: -45,
            opacity: 0,
            config: {
              mass: 3.4,
              tension: 400,
              friction: 20,
              precision: 0.2,
              velocity: 8,
              clamp: true,
            },
          });
          await next({
            y,
            config: { duration: 5 },
          });
          next({
            opacity: 1,
            config: {
              mass: 3.4,
              tension: 400,
              friction: 20,
              precision: 0.2,
              velocity: 7,
              clamp: true,
            },
          });
          await next({
            rotation: 0,
            config: {
              mass: 3.4,
              tension: 400,
              friction: 20,
              precision: 0.2,
              velocity: 7,
            },
          });
        }}
        getItemAnimatedDivStyle={({
          index,
          itemOptions: { opacity, y, rotation },
        }) => ({
          ...itemStyles,
          opacity,
          zIndex: items.length - index,
          top: y.interpolate((y: number) => `${y}px`),
          transform: rotation.interpolate(
            (rotation: number) => `rotateX(${rotation}deg)`
          ),
        })}
        trail={25}
        {...rest}
      />
    );
  }
}
