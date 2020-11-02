import * as React from 'react';
import { Transition, animated, config } from 'react-spring/renderprops';

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
        from={{ opacity: 1, scale: 1 }}
        leave={{ opacity: 1 }}
        enter={({ y }) => ({ y, opacity: 1 })}
        update={({ y }) => ({ y, scale: 1 })}
        config={this.config}
      >
        {({ variant }, s, i) => ({ opacity, y, height }: any) => (
          <animated.div
            style={{
              ...itemStyles,
              opacity,
              height,
              zIndex: items.length - i,
              transform: y.interpolate(
                (y: number) => `translate3d(0,${y}px, 0)`
              ),
            }}
            children={renderItemContent(variant)}
            {...getItemHTMLAttributes(variant)}
          />
        )}
      </Transition>
    );
  }
}
