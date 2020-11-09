import { EVariantAnimation } from '../../enums/EVariantAnimation';
import { Wave, Scale, Bounce, Slide } from './components';
import { AnimationComponentById } from './types';

export const animationComponentById: AnimationComponentById = {
  [EVariantAnimation.Scale]: Scale,
  [EVariantAnimation.Wave]: Wave,
  [EVariantAnimation.Bounce]: Bounce,
  [EVariantAnimation.Slide]: Slide,
};
