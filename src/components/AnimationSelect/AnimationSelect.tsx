import React from 'react';
import { Select } from 'antd';
import { EVariantAnimation } from '../../enums/EVariantAnimation';

const { Option } = Select;

interface IAnimationSelectProps {
  defaultValue?: EVariantAnimation;
  options: {
    value: EVariantAnimation;
    label: React.ReactNode;
  }[];
  onChange: (value: EVariantAnimation) => void;
}

export const AnimationSelect = ({
  defaultValue = EVariantAnimation.Scale,
  options,
  onChange,
}: IAnimationSelectProps) => {
  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: 120 }}
      onChange={onChange}
    >
      {options.map(({ value, label }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  );
};
