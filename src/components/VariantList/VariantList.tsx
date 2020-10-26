import React from 'react';
import { useSpring, animated } from 'react-spring';

interface IVariantListProps {
  variantList: { id: string; variant: string }[];
  renderVariant: (props: { id: string; variant: string }) => React.ReactNode;
}

export const VariantList = ({
  variantList,
  renderVariant,
}: IVariantListProps) => {
  const animatedProps = useSpring({ opacity: 1, from: { opacity: 0 } }); // show up animation

  return (
    <animated.div style={animatedProps} className="variantList">
      {variantList.map(renderVariant)}
    </animated.div>
  );
};
