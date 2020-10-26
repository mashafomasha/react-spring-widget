import { UseTransitionResult } from 'react-spring';
import { EVariantAnimation } from '../../enums/EVariantAnimation';
import { IVariant } from '../../types/variant';

export interface IAnimationCreatorOptions {
  variantOrder: IVariant[];
  variantPositionTopById: { [key: string]: number };
  variantHeightById: { [key: string]: number };
}

export type AnimationCreatorHookByName = {
  [key in EVariantAnimation]: AnimationCreatorHook;
};

export type AnimationCreatorHook = (
  options: IAnimationCreatorOptions
) => UseTransitionResult<any, any>[];
