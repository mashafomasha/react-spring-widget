import React from 'react';

import { IVariant } from '../../types/variant';
import { AnimationComponentProps } from '../Amination/types';
import { Variant, List } from './components';

import './styles.css';

type VariantListProps = {
  variantList: IVariant[];
  Animation: React.ComponentType<AnimationComponentProps>;
};
type VariantListState = {
  heightById: { [key: string]: number };
};

const dataAttrName = 'data-variant-id' as const;

export class VariantList extends React.PureComponent<
  VariantListProps,
  VariantListState
> {
  private containerRef = React.createRef<HTMLDivElement>();

  state: VariantListState = {
    heightById: {},
  };

  componentDidMount() {
    setTimeout(() => {
      this.getVariantHeightById();
    }, 0);
  }

  private getVariantHeightById = () => {
    if (this.containerRef.current) {
      const heightById: { [key: string]: number } = {};
      const variantNodeList = this.containerRef.current.querySelectorAll(
        `*[${dataAttrName}]`
      );

      variantNodeList.forEach((node) => {
        const variantId = (node as HTMLDivElement).dataset?.variantId;

        if (variantId) {
          const height = (node as HTMLDivElement).offsetHeight;
          const { marginTop, marginBottom } = getComputedStyle(
            node as HTMLDivElement
          );

          const elementHeight =
            height +
            parseFloat(marginTop.replace('px', '')) +
            parseFloat(marginBottom.replace('px', ''));

          heightById[variantId] = elementHeight;
        }
      });

      this.setState({ heightById });
    }
  };

  render() {
    const { variantList, Animation } = this.props;
    const { heightById } = this.state;

    return (
      <div className="variantList" ref={this.containerRef}>
        <List
          items={variantList}
          keys={({ id }) => id}
          heights={({ id }) => heightById[id] || 0}
          Animation={Animation}
          getItemHTMLAttributes={(variant) => ({
            [dataAttrName]: variant.id,
          })}
        >
          {(variant) => <Variant variant={variant} />}
        </List>
      </div>
    );
  }
}
