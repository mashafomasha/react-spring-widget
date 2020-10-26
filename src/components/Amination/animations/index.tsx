import { useTransition, config } from 'react-spring';

import { IAnimationCreatorOptions } from '../interfaces';

export const useAnimationA = ({
  variantOrder,
  variantPositionTopById,
}: IAnimationCreatorOptions) => {
  const variantListWithTransitions = useTransition(
    variantOrder.map(({ id, ...rest }) => {
      return {
        id,
        ...rest,
        top: variantPositionTopById[id] ?? 0,
      };
    }),
    variantOrder.map(({ id }) => id),
    {
      from: { position: 'absolute', opacity: 0 },
      enter: ({ top }) => ({ top, opacity: 1 }),
      leave: { height: 0, opacity: 0 },
      update: ({ top }) => ({ top }),
      config: config.gentle,
    }
  );

  return variantListWithTransitions;
};

export const useAnimationB = ({
  variantOrder,
  variantPositionTopById,
}: IAnimationCreatorOptions) => {
  const variantListWithTransitions = useTransition(
    variantOrder.map(({ id, ...rest }) => {
      return {
        id,
        ...rest,
        top: variantPositionTopById[id] ?? 0,
      };
    }),
    variantOrder.map(({ id }) => id),
    {
      from: { position: 'absolute', opacity: 0 },
      enter: ({ top }) => ({ top }),
      leave: { height: 0, opacity: 0 },
      update: ({ top }) => ({ top }),
      config: config.wobbly,
    }
  );

  return variantListWithTransitions;
};

export const useAnimationC = ({
  variantOrder,
  variantPositionTopById,
}: IAnimationCreatorOptions) => {
  const variantListWithTransitions = useTransition(
    variantOrder.map(({ id, ...rest }) => {
      return {
        id,
        ...rest,
        top: variantPositionTopById[id] ?? 0,
      };
    }),
    variantOrder.map(({ id }) => id),
    {
      from: { position: 'absolute', opacity: 0 },
      enter: ({ top }) => ({ top }),
      leave: { height: 0, opacity: 0 },
      update: ({ top }) => ({ top }),
      config: config.stiff,
    }
  );

  return variantListWithTransitions;
};

export const useAnimationD = ({
  variantOrder,
  variantPositionTopById,
}: IAnimationCreatorOptions) => {
  const variantListWithTransitions = useTransition(
    variantOrder.map(({ id, ...rest }) => {
      return {
        id,
        ...rest,
        top: variantPositionTopById[id] ?? 0,
      };
    }),
    variantOrder.map(({ id }) => id),
    {
      from: { position: 'absolute', opacity: 0 },
      enter: ({ top }) => ({ top }),
      leave: { height: 0, opacity: 0 },
      update: ({ top }) => ({ top }),
      config: config.molasses,
    }
  );

  return variantListWithTransitions;
};
