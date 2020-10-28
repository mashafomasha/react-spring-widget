import React from 'react';
import { animated } from 'react-spring';
import { IVariant } from '../../types/variant';
import { AnimationCreatorHook } from '../Amination/interfaces';

import './styles.css';

interface IVariantListProps {
  variantList: IVariant[];
  renderVariant: (props: IVariant) => React.ReactNode;
  useVariantAnimation: AnimationCreatorHook;
}

export const VariantList = React.memo(
  ({ variantList, renderVariant, useVariantAnimation }: IVariantListProps) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    // TODO: refactor to useReducer
    const [heightById, setHeightById] = React.useState<{
      [key: string]: number;
    }>({});
    const [positionTopById, setPositionTopById] = React.useState<{
      [key: string]: number;
    }>({});
    const [prevVariantList, setPrevVariantList] = React.useState<IVariant[]>(variantList);
    const [changedVariantList, setChangedVariantList] = React.useState<IVariant[]>([]);

    React.useEffect(() => {
      const diff = variantList.filter((variant, idx) => prevVariantList[idx]?.id !== variant.id);

      setChangedVariantList(diff);
      setPrevVariantList(variantList);
    }, [variantList]);

    React.useEffect(() => {
      if (containerRef.current) {
        const nextHeightById = { ...heightById };
        const nextPositionTopById = { ...positionTopById };
        const variantNodeList = containerRef.current.childNodes;

        let totalHeight = 0;

        variantNodeList.forEach((node) => {
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

    const [variantTransition, interpolationFunction] = useVariantAnimation({
      order: variantList,
      positionTopById: positionTopById,
      heightById: heightById,
      changed: changedVariantList,
    });

    return (
      <div className="variantList" ref={containerRef}>
        {variantTransition.map(({ item, key, props }) => {
          return (
            <animated.div
              key={key}
              style={interpolationFunction ? interpolationFunction(props) : props}
              data-variant-id={item.id}
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
