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
        update={({ y }) => ({ y })}
        config={this.config}
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
                    y.interpolate((y: number) => `translate3d(0,${y}px, 0)`),
                    y
                      // .interpolate({ range: [0, 0.5, 1], output: [1, 1.1, 1] })
                      .interpolate((o: number) => `scale(${i < 3 ? 1.1 : 1})`),
                  ],
                  (translate, scale) => `${translate} ${scale}`
                ),
                padding: i < 3 ? 5 : 0,
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
