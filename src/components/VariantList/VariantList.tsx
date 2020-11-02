import React from 'react';

import { usePrevious } from '../../hooks/previous';
import { IVariant } from '../../types/variant';
import { AnimationCreatorHook } from '../Amination/interfaces';
import { reducer, initialState, setState } from './state';
import { Variant } from './components';

import './styles.css';

interface IVariantListProps {
  variantList: IVariant[];
  useVariantAnimation: AnimationCreatorHook;
}

export const VariantList = React.memo(
  ({ variantList, useVariantAnimation }: IVariantListProps) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [prevVariantList] = usePrevious<IVariant[]>(variantList);

    React.useEffect(() => {
      if (containerRef.current) {
        const heightById: { [key: string]: number } = {};
        const positionTopById: { [key: string]: number } = {};
        const variantNodeList = containerRef.current.childNodes;

        let totalHeight = 0;

        variantNodeList.forEach((node) => {
          const variantId = (node as HTMLDivElement).dataset?.variantId;

          if (variantId) {
            const height = (node as HTMLDivElement).offsetHeight;
            const { marginTop, marginBottom } = getComputedStyle(
              node as HTMLDivElement
            );

            const elementHeight =
              height +
              parseFloat(marginTop.replace('px', '')) +
              parseFloat(marginBottom.replace('px', ''));

            heightById[variantId] = elementHeight;
            positionTopById[variantId] = totalHeight;

            totalHeight += elementHeight;
          }
        });

        const changed = variantList
          .filter((variant, idx) => prevVariantList[idx]?.id !== variant.id)
          .map(({ id }) => id);

        dispatch(setState({ changed, heightById, positionTopById }));
      }
    }, [variantList]);

    const [variantTransition, interpolationFunction] = useVariantAnimation({
      order: variantList,
      ...state,
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
