import { EVariantAnimation } from '../../enums/EVariantAnimation';

import { AnimationCreatorHookByName } from './interfaces';
import { useAnimationA, useAnimationB } from './animations';

export const animationCreatorHookByName: AnimationCreatorHookByName = {
  [EVariantAnimation.A]: useAnimationA,
  [EVariantAnimation.B]: useAnimationB,
  [EVariantAnimation.C]: useAnimationA,
  [EVariantAnimation.D]: useAnimationA,
};
