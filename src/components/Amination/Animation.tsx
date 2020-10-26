import { AnimatedValue, useSpring } from 'react-spring';
import { EVariantAnimation } from '../../enums/EVariantAnimation';

export const animationByName: {
  [key in EVariantAnimation]: () => AnimatedValue<any>;
} = {
  [EVariantAnimation.A]: () => useSpring({ opacity: 1, from: { opacity: 0 } }),
  [EVariantAnimation.B]: () => useSpring({ opacity: 1, from: { opacity: 0 } }),
  [EVariantAnimation.C]: () => useSpring({ opacity: 1, from: { opacity: 0 } }),
  [EVariantAnimation.D]: () => useSpring({ opacity: 1, from: { opacity: 0 } }),
};
