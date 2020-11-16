import * as React from 'react';
import { config, interpolate } from 'react-spring/renderprops';

import { BaseAnimation } from '../BaseAnimation';
import { AnimationComponentProps } from '../../types';

export class Wave extends React.PureComponent<AnimationComponentProps> {
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
        trail={105}
        enter={({ y }) => ({ y, opacity: 1, x: 0, rotation: 0 })} // do not specify height in order to get "auto" value
        // update={({ y, variant: { id } }) => {
        //   const changed = changedIds.includes(id);

        //   if (!changed) {
        //     return { y };
        //   }

        //   // multistaging
        //   return [
        //     { y },
        //     { x: 0, rotation: 0 },
        //     { x: 10, rotation: 5 },
        //     { x: -10, rotation: -5 },
        //     { x: 0, rotation: 0 },
        //   ];
        // }}
        update={({ y, variant: { id } }) => async (next: any, stop: any) => {
          const changed = changedIds.includes(id);

          await next({ y });

          if (!changed) {
            return;
          }

          await next({ x: 0, rotation: 0, config: this.config });
          await next({ x: 10, rotation: 5, config: this.config });
          await next({ x: -10, rotation: -5, config: this.config });
          await next({ x: 0, rotation: 0, config: this.config });
        }}
        getItemOuterAnimatedStyle={({
          index,
          itemOptions: { opacity, y, x, rotation },
        }) => ({
          ...itemStyles,
          opacity,
          zIndex: items.length - index,
          transform: interpolate(
            [
              y.interpolate((y: number) => `translateY(${y}px)`),
              x.interpolate((x: number) => `translateX(${x}px)`),
              rotation.interpolate(
                (rotation: number) => `rotate(${rotation}deg)`
              ),
            ],
            (translateX, translateY, rotate) =>
              `${translateX} ${translateY} ${rotate}`
          ),
        })}
        {...rest}
      />
    );
  }
}
