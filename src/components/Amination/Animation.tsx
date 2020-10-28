import { EVariantAnimation } from '../../enums/EVariantAnimation';

import { AnimationCreatorHookByName } from './interfaces';
import { useAnimationWithInterpolationFunction, useAnimationWithBasicSetup } from './animations';

export const animationCreatorHookByName: AnimationCreatorHookByName = {
  [EVariantAnimation.A]: useAnimationWithInterpolationFunction,
  [EVariantAnimation.B]: useAnimationWithBasicSetup,
  [EVariantAnimation.C]: useAnimationWithBasicSetup,
  [EVariantAnimation.D]: useAnimationWithBasicSetup,
};
