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
  console.log(JSON.stringify(changed));

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
      transform: customValue.interpolate((v: any) => `rotate(${360 * v}deg)`),
      border: customValue.interpolate((v: any) => `${v * 2}px solid red`),
      borderColor: customValue.interpolate({
        range: [0, 1],
        output: ['red', '#ffaabb'],
      }),
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

export const useAnimationWithKeyframesSetup = ({
  order,
  changed,
  positionTopById,
}: AnimationCreatorOptions): AnimationCreatorHookResult => {
  console.log(changed);

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
      config: { duration: 1000 },
    }
  );

  const interpolationFunction = ({ customValue, ...rest }: any) => {
    const style = {
      ...rest,
      opacity: customValue.interpolate({ range: [0, 1], output: [0.3, 1] }),
      transform: customValue
        .interpolate({
          range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
          output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
        })
        .interpolate((v: any) => `scale(${v})`),
    };

    return style;
  };

  return [variantListWithTransitions, interpolationFunction];
};
