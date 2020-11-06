import * as React from 'react';
import {
  Transition,
  animated,
  TransitionProps,
  State,
} from 'react-spring/renderprops';

import { IVariant } from '../../../../types/variant';
import { TransitionItem } from '../../types';

type AnimationProps<T extends TransitionItem> = TransitionProps<T> & {
  renderItemContent: (variant: IVariant) => React.ReactNode;
  getItemHTMLAttributes: (
    variant: IVariant
  ) => React.HTMLAttributes<HTMLDivElement> & { [data: string]: string };
  getItemAnimatedDivStyle: (options: {
    variant: IVariant;
    itemOptions: any;
    state: State;
    index: number;
  }) => React.CSSProperties;
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
      getItemHTMLAttributes,
      getItemAnimatedDivStyle,
      ...rest
    } = this.props;

    return (
      <Transition native keys={keys} initial={initial} enter={enter} {...rest}>
        {({ variant }, state, index) => (itemOptions: any) => {
          return (
            <animated.div
              style={getItemAnimatedDivStyle({
                variant,
                itemOptions,
                state,
                index,
              })}
              children={renderItemContent(variant)}
              {...getItemHTMLAttributes(variant)}
            />
          );
        }}
      </Transition>
    );
  }
}
