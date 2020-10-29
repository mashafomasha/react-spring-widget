import { UseTransitionResult } from 'react-spring';
import { EVariantAnimation } from '../../enums/EVariantAnimation';
import { IVariant } from '../../types/variant';

export type AnimationCreatorOptions = {
  order: IVariant[];
  changed: IVariant['id'][];
  heightById: { [key: string]: number };
  positionTopById: { [key: string]: number };
};

export type AnimationCreatorHookByName = {
  [key in EVariantAnimation]: AnimationCreatorHook;
};

export type InterpolationFunction = <P, A>(props: P) => A;
export type AnimationCreatorHookResult = [
  UseTransitionResult<any, any>[],
  InterpolationFunction?
];

export type AnimationCreatorHook = (
  options: AnimationCreatorOptions
) => AnimationCreatorHookResult;
