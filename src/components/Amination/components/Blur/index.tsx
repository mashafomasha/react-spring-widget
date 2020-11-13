import * as React from 'react';
import { config, interpolate } from 'react-spring/renderprops';

import { Filter } from './components';
import { BaseAnimation } from '../BaseAnimation';
import { AnimationComponentProps } from '../../types';

export class Blur extends React.PureComponent<AnimationComponentProps> {
  private filterId = 'svg-blur';
  private config = {
    mass: 1,
    tension: 380,
    friction: 1,
  };

  render() {
    const { items, itemStyles, changedIds, children, ...rest } = this.props;

    return (
      <>
        <Filter id={this.filterId} deviation={4} />
        <BaseAnimation
          items={items}
          config={config.gentle}
          from={{ opacity: 0, translateY: 0 }}
          leave={{ opacity: 0, translateY: 0 }}
          enter={({ y }) => ({ y, opacity: 1, translateY: 0 })}
          update={({ y, variant: { id } }) => async (next: any) => {
            const changed = changedIds.includes(id);

            if (!changed) {
              await next({ y });
              return;
            }

            await next({
              opacity: 0,
              translateY: 50,
              filter: `url(#${this.filterId})`,
              config: { ...this.config, duration: 200 },
            });
            await next({
              y,
              translateY: -50,
              config: { ...this.config, duration: 50 },
            });
            await next({
              opacity: 1,
              translateY: 0,
              config: { ...this.config, duration: 275 },
            });
            await next({
              filter: 'unset',
              config: { ...this.config, duration: 125 },
            });
          }}
          getItemAnimatedDivStyle={({
            index,
            itemOptions: { opacity, filter, y, translateY },
          }) => ({
            ...itemStyles,
            filter,
            opacity,
            zIndex: items.length - index,
            top: interpolate(
              [y.interpolate((y: number) => `${y}px`)],
              (top) => `${top}`
            ),
            transform: interpolate(
              [translateY.interpolate((y: number) => `translateY(${y}%)`)],
              (translateY) => `${translateY}`
            ),
          })}
          {...rest}
        />
      </>
    );
  }
}
