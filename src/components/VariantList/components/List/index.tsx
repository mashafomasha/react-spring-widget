import * as React from 'react';
import { Transition, animated, SpringConfig } from 'react-spring/renderprops';
import { IVariant } from '../../../../types/variant';

const styles = {
  outer: { position: 'relative', width: '100%', height: '100%' },
  cell: {
    position: 'absolute',
    willChange: 'transform, height, opacity',
    width: '100%',
  },
} as const;

type ListProps = {
  items: IVariant[];
  config: SpringConfig;
  keys: (item: IVariant) => IVariant['id'];
  heights: (item: IVariant) => number;
  children: (item: IVariant) => React.ReactNode;
  className?: string;
};

export class List extends React.PureComponent<ListProps> {
  render() {
    const { children, config, items, keys, heights, ...rest } = this.props;
    let totalHeight = 0;

    const displayData = items.map((child) => {
      const y = totalHeight;
      const height = heights(child);
      totalHeight += height;
      return { y, height, key: keys(child), child };
    });

    return (
      <div style={{ ...styles.outer, height: totalHeight }} {...rest}>
        <Transition
          native
          items={displayData}
          keys={(d) => d.key}
          initial={null}
          from={{ opacity: 1, scale: 1 }}
          leave={{ opacity: 1 }}
          enter={({ y }) => ({ y, opacity: 1 })}
          update={({ y }) => ({ y, scale: 1 })}
          config={config}
        >
          {({ child }, s, i) => ({ opacity, y, height }: any) => (
            <animated.div
              style={{
                ...styles.cell,
                opacity,
                height,
                zIndex: displayData.length - i,
                transform: y.interpolate(
                  (y: number) => `translate3d(0,${y}px, 0)`
                ),
              }}
              children={children(child)}
              data-variant-id={child.id}
            />
          )}
        </Transition>
      </div>
    );
  }
}
