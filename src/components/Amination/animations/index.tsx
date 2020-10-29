import { useTransition, config } from 'react-spring';

import {
  AnimationCreatorHookResult,
  AnimationCreatorOptions,
} from '../interfaces';

export const useAnimationWithInterpolationFunction = ({
  order,
  changed,
  positionTopById,
}: AnimationCreatorOptions): AnimationCreatorHookResult => {
  const variantListWithTransitions = useTransition(
    order.map(({ id, ...rest }) => {
      const isChanged = Boolean(changed.find(({ id: chId }) => chId === id));

      return {
        id,
        ...rest,
        top: positionTopById[id] ?? 0,

        customValue: isChanged ? 1 : 0,
      };
    }),
    order.map(({ id }) => id),
    {
      from: () => ({ position: 'absolute', customValue: 0 }),
      enter: ({ top, customValue }) => ({ top, customValue }),
      leave: ({ top }) => ({ top, customValue: 0 }),
      update: ({ top, customValue }) => ({ top, customValue }),
    }
  );

  const interpolationFunction = ({ customValue, ...rest }: any) => {
    // FIXME: type
    const style = {
      ...rest,
      // Unless you need to interpolate them
      // background: customValue.interpolate((v: any) => `rgba(210, 57, 77, ${v})`),
      // Which works with arrays as well
      transform: customValue.interpolate((v: any) => `rotate(${45 * v}deg)`),
      // If you want to combine multiple values use the "interpolate" helper
      border: customValue.interpolate((v: any) => `${v * 10}px solid red`),
      // You can also form ranges, even chain multiple interpolations
      // padding: customValue.interpolate({ range: [0, 0.5, 1], output: [0, 0, 10] }).interpolate((v: any) => `${v}%`),
      // Interpolating strings (like up-front) through ranges is allowed ...
      borderColor: customValue.interpolate({
        range: [0, 1],
        output: ['red', '#ffaabb'],
      }),
      // There's also a shortcut for plain, optionless ranges ...
      opacity: customValue.interpolate([0.1, 0.2, 0.6, 1], [1, 0.1, 0.5, 1]),
    };

    return style;
  };

  return [variantListWithTransitions, interpolationFunction];
};

export const useAnimationWithBasicSetup = ({
  order,
  positionTopById,
}: AnimationCreatorOptions): AnimationCreatorHookResult => {
  const variantListWithTransitions = useTransition(
    order.map(({ id, ...rest }) => {
      return {
        id,
        ...rest,
        top: positionTopById[id] ?? 0,
      };
    }),
    order.map(({ id }) => id),
    {
      from: { position: 'absolute', opacity: 0 },
      enter: ({ top }) => ({ top }),
      leave: { height: 0, opacity: 0 },
      update: ({ top }) => ({ top }),
      config: config.wobbly,
    }
  );

  return [variantListWithTransitions];
};
