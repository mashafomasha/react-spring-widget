import React from 'react';
import { useTransition, animated } from 'react-spring';

import './styles.css';

interface IVariantListProps {
  variantList: { id: string; variant: string }[];
  renderVariant: (props: { id: string; variant: string }) => React.ReactNode;
}

export const VariantList = React.memo(
  ({ variantList, renderVariant }: IVariantListProps) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const [heightById, setHeightById] = React.useState<{
      [key: string]: number;
    }>({});
    const [positionTopById, setPositionTopById] = React.useState<{
      [key: string]: number;
    }>({});

    React.useEffect(() => {
      if (containerRef.current) {
        const nextHeightById = { ...heightById };
        const nextPositionTopById = { ...positionTopById };
        const variantNodeList = containerRef.current.childNodes;

        let totalHeight = 0;

        variantNodeList.forEach((node, idx) => {
          const variantId = (node as HTMLDivElement).dataset?.variantId;

          if (variantId) {
            const { height } = (node as HTMLDivElement).getBoundingClientRect();

            nextHeightById[variantId] = height;
            nextPositionTopById[variantId] = totalHeight;

            totalHeight += height;
          }
        });

        setHeightById(nextHeightById);
        setPositionTopById(nextPositionTopById);
      }
    }, [variantList]);

    // item update animation
    const variantListWithTransitions = useTransition(
      variantList.map(({ id, ...rest }) => {
        return {
          id,
          ...rest,
          top: positionTopById[id] ?? 0,
        };
      }),
      variantList.map(({ id }) => id),
      {
        from: { position: 'absolute', opacity: 0 },
        enter: ({ top }) => ({ top, opacity: 1 }),
        leave: { height: 0, opacity: 0 },
        update: ({ top }) => ({ top }),
      }
    );

    return (
      <div className="variantList" ref={containerRef}>
        {variantListWithTransitions.map(({ item, key, props }: any, idx) => {
          return (
            <animated.div
              key={key}
              style={props}
              data-variant-id={item.id}
              data-variant-idx={idx}
              className="variantContainer"
            >
              {renderVariant(item)}
            </animated.div>
          );
        })}
      </div>
    );
  }
);
