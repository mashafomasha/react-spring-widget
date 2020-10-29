import { EVariantAnimation } from '../../enums/EVariantAnimation';

import { AnimationCreatorHookByName } from './interfaces';
import {
  useAnimationWithInterpolationFunction,
  useAnimationWithBasicSetup,
  useAnimationWithKeyframesSetup,
} from './animations';

export const animationCreatorHookByName: AnimationCreatorHookByName = {
  [EVariantAnimation.A]: useAnimationWithInterpolationFunction,
  [EVariantAnimation.B]: useAnimationWithKeyframesSetup,
  [EVariantAnimation.C]: useAnimationWithBasicSetup,
  [EVariantAnimation.D]: useAnimationWithBasicSetup,
};
