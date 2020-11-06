import * as React from 'react';
import {
  Transition,
  animated,
  config,
  interpolate,
} from 'react-spring/renderprops';

import { AnimationComponentProps } from '../../types';

export class Bounce extends React.PureComponent<AnimationComponentProps> {
  private config = {
    mass: 1,
    tension: 150,
    friction: 1,
    duration: 125,
  };

  render() {
    const {
      items,
      itemStyles,
      renderItemContent,
      getItemHTMLAttributes,
      changedIds,
    } = this.props;

    return (
      <Transition
        native
        items={items}
        keys={(d) => d.key}
        initial={null}
        from={{ opacity: 1 }}
        leave={{ opacity: 1 }}
        enter={({ y }) => ({ y, opacity: 1 })} // do not specify height in order to get "auto" value
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
        config={config.gentle}
      >
        {({ variant }, s, i) => ({ opacity, y }: any) => {
          return (
            <animated.div
              style={{
                ...itemStyles,
                opacity,
                zIndex: items.length - i,
                transform: interpolate(
                  [
                    y.interpolate((y: number) => `translateY(${y}px)`),
                  ],
                  (translateY) => `${translateY}`
                ),
                // padding: i < 3 ? 5 : 0,
              }}
              children={renderItemContent(variant)}
              {...getItemHTMLAttributes(variant)}
            />
          );
        }}
      </Transition>
    );
  }
}
