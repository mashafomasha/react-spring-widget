import { EVariantAnimation } from '../../enums/EVariantAnimation';
import { Wobbly, Slide } from './components';
import { AnimationComponentById } from './types';

export const animationComponentById: AnimationComponentById = {
  [EVariantAnimation.A]: Slide,
  [EVariantAnimation.B]: Wobbly,
  [EVariantAnimation.C]: Wobbly,
  [EVariantAnimation.D]: Wobbly,
};
