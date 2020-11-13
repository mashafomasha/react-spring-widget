import * as React from 'react';
import { config, interpolate } from 'react-spring/renderprops';

import { BaseAnimation } from '../BaseAnimation';
import { AnimationComponentProps } from '../../types';

export class Opacity extends React.PureComponent<AnimationComponentProps> {
  private config = {
    mass: 1,
    tension: 380,
    friction: 1,
    duration: 125,
  };

  render() {
    const { items, itemStyles, changedIds, children, ...rest } = this.props;

    return (
      <BaseAnimation
        items={items}
        config={config.gentle}
        from={{ opacity: 0 }}
        leave={{ opacity: 0 }}
        enter={({ y }) => ({ y, opacity: 1 })} // do not specify height in order to get "auto" value
        update={({ y, variant: { id } }) => async (next: any) => {
          const changed = changedIds.includes(id);

          if (!changed) {
            await next({ y });
            return;
          }

          await next({ opacity: 0, config: this.config });
          await next({ y, config: this.config });
          await next({ opacity: 1, config: this.config });
        }}
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
