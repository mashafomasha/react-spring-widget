import { EVariantAnimation } from '../../enums/EVariantAnimation';
import { Wobbly } from './components';
import { AnimationComponentById } from './types';

export const animationComponentById: AnimationComponentById = {
  [EVariantAnimation.A]: Wobbly,
  [EVariantAnimation.B]: Wobbly,
  [EVariantAnimation.C]: Wobbly,
  [EVariantAnimation.D]: Wobbly,
};
