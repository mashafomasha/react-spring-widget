import React from 'react';

import { IVariant } from '../../types/variant';
import { AnimationCreatorHook } from '../Amination/interfaces';
import { Variant } from './components';

import './styles.css';

interface IVariantListProps {
  variantList: IVariant[];
  useVariantAnimation: AnimationCreatorHook;
}

export const VariantList = React.memo(
  ({ variantList, useVariantAnimation }: IVariantListProps) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    // TODO: refactor to useReducer
    const [heightById, setHeightById] = React.useState<{
      [key: string]: number;
    }>({});
    const [positionTopById, setPositionTopById] = React.useState<{
      [key: string]: number;
    }>({});
    const [prevVariantList, setPrevVariantList] = React.useState<IVariant[]>(
      variantList
    );
    const [changedVariantList, setChangedVariantList] = React.useState<
      IVariant[]
    >([]);

    React.useEffect(() => {
      const diff = variantList.filter(
        (variant, idx) => prevVariantList[idx]?.id !== variant.id
      );

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
            const { marginTop, marginBottom } = getComputedStyle(
              node as HTMLDivElement
            );

            const elementHeight =
              height +
              parseFloat(marginTop.replace('px', '')) +
              parseFloat(marginBottom.replace('px', ''));

            nextHeightById[variantId] = elementHeight;
            nextPositionTopById[variantId] = totalHeight;

            totalHeight += elementHeight;
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
        {variantTransition.map(({ item, key, props, ...rest }) => {
          return (
            <Variant
              key={key}
              item={item}
              variantKey={key}
              props={
                interpolationFunction ? interpolationFunction(props) : props
              }
              data-variant-id={item.id}
              {...rest}
            >
              {item.variant}
            </Variant>
          );
        })}
      </div>
    );
  }
);
