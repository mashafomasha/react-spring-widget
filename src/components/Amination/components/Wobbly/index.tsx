import * as React from 'react';
import {
  Transition,
  animated,
  config,
  interpolate,
} from 'react-spring/renderprops';

import { AnimationComponentProps } from '../../types';

export class Wobbly extends React.PureComponent<AnimationComponentProps> {
  private config = config.wobbly;

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
        enter={({ y }) => ({ y, opacity: 1, x: 0, rotation: 0 })} // do not specify height in order to get "auto" value
        update={({ y, variant: { id } }) => {
          const changed = changedIds.includes(id);

          if (!changed) {
            return { y };
          }

          // multistaging
          return [
            { y },
            { x: 0, rotation: 0 },
            { x: 10, rotation: 5 },
            { x: -10, rotation: -5 },
            { x: 0, rotation: 0 },
          ];
        }}
        config={this.config}
      >
        {({ variant }, s, i) => ({ opacity, x, y, rotation }: any) => {
          return (
            <animated.div
              style={{
                ...itemStyles,
                opacity,
                zIndex: items.length - i,
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
