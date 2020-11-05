import * as React from 'react';
import {
  Transition,
  animated,
  config,
  interpolate,
} from 'react-spring/renderprops';

import { AnimationComponentProps } from '../../types';

export class Slide extends React.PureComponent<AnimationComponentProps> {
  private config = {
    mass: 1,
    tension: 380,
    friction: 1,
    duration: 175,
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
        config={config.gentle}
      >
        {({ variant }, s, i) => ({ opacity, y, scale }: any) => {
          return (
            <animated.div
              style={{
                ...itemStyles,
                opacity,
                zIndex: items.length - i,
                transform: interpolate(
                  [
                    y.interpolate((y: number) => `translateY(${y}px)`),
                    scale.interpolate((s: number) => `scale(${s})`),
                  ],
                  (translateX, scale) => `${translateX} ${scale}`
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
