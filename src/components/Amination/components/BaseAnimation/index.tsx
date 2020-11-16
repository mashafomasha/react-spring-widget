import * as React from 'react';
import {
  Transition,
  animated,
  TransitionProps,
  State,
} from 'react-spring/renderprops';

import { IVariant } from '../../../../types/variant';
import { TransitionItem } from '../../types';

type AnimatedStyleOptions = {
  variant: IVariant;
  itemOptions: any;
  state: State;
  index: number;
};
export type AnimationProps<T extends TransitionItem> = TransitionProps<T> & {
  renderItemContent: (variant: IVariant) => React.ReactNode;
  getItemOuterHTMLAttributes: (
    variant: IVariant
  ) => React.HTMLAttributes<HTMLDivElement> & { [data: string]: string };
  getItemOuterAnimatedStyle: (
    options: AnimatedStyleOptions
  ) => React.CSSProperties;
  getItemInnerAnimatedStyle?: (
    options: AnimatedStyleOptions
  ) => React.CSSProperties;
};

export class BaseAnimation<
  T extends TransitionItem
> extends React.PureComponent<AnimationProps<T>> {
  render() {
    const {
      keys = ({ key }: T) => key,
      initial = null,
      enter = ({ y }: { y: number }) => ({ y }),
      renderItemContent,
      getItemOuterHTMLAttributes,
      getItemOuterAnimatedStyle,
      getItemInnerAnimatedStyle,
      ...rest
    } = this.props;

    return (
      <Transition native keys={keys} initial={initial} enter={enter} {...rest}>
        {({ variant }, state, index) => (itemOptions: any) => {
          const options = {
            itemOptions,
            variant,
            state,
            index,
          };

          return (
            <animated.div
              style={getItemOuterAnimatedStyle(options)}
              {...getItemOuterHTMLAttributes(variant)}
            >
              <animated.div
                style={
                  getItemInnerAnimatedStyle
                    ? getItemInnerAnimatedStyle(options)
                    : {}
                }
              >
                {renderItemContent(variant)}
              </animated.div>
            </animated.div>
          );
        }}
      </Transition>
    );
  }
}
