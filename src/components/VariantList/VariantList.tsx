import React from 'react';
import { ResizeObserver } from 'resize-observer';
import { ResizeObserverCallback } from 'resize-observer/lib/ResizeObserverCallback';

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
  private observer: ResizeObserver;

  constructor(props: VariantListProps) {
    super(props);

    this.state = {
      heightById: {},
    };

    this.observer = new ResizeObserver(this.observeHeightChange);
  }

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

          // watch for changes
          this.observer.observe(node);
        }
      });

      this.setState({ heightById });
    }
  };

  private observeHeightChange: ResizeObserverCallback = (entries) => {
    const heightById = { ...this.state.heightById };

    for (const entry of entries) {
      const { contentRect, target } = entry;
      const variantId = (target as HTMLDivElement).dataset?.variantId;

      console.log(contentRect, heightById[variantId!]);
      if (variantId && contentRect.height !== heightById[variantId]) {
        heightById[variantId] = contentRect.height;
      }
    }

    this.setState({ heightById });
  };

  componentWillUnmount() {
    this.observer.disconnect();
  }

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
