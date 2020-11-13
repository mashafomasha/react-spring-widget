import { EVariantAnimation } from '../../enums/EVariantAnimation';
import { Wave, Scale, Bounce, Slide, Blur, Opacity } from './components';
import { AnimationComponentById } from './types';

export const animationComponentById: AnimationComponentById = {
  [EVariantAnimation.BLUR]: Blur,
  [EVariantAnimation.SCALE]: Scale,
  [EVariantAnimation.WAVE]: Wave,
  [EVariantAnimation.BOUNCE]: Bounce,
  [EVariantAnimation.SLIDE]: Slide,
  [EVariantAnimation.OPACITY]: Opacity,
};
