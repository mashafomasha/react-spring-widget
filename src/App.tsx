import React from 'react';
import { Input, Button } from 'antd';

import { data, options } from './constants';
import { VariantList } from './components/VariantList';
import { AnimationSelect } from './components/AnimationSelect';
import { animationComponentById } from './components/Amination';
import { EVariantAnimation } from './enums/EVariantAnimation';

import 'antd/dist/antd.css';
import './App.css';

function App() {
  const [variantList, setVariantList] = React.useState<typeof data>(data);
  const [variantAnimation, setVariantAnimation] = React.useState<
    EVariantAnimation
  >(EVariantAnimation.BLUR);
  const [swapFirst, setSwapFirst] = React.useState<number | undefined>();
  const [swapSecond, setSwapSecond] = React.useState<number | undefined>();
  const disabled =
    typeof swapFirst === 'undefined' || typeof swapSecond === 'undefined';

  const handleChangeSwapValue = (
    value: string,
    success: (value: number | undefined) => void
  ) => {
    const parsed = parseInt(value, 10);
    success(Number.isNaN(parsed) ? undefined : parsed);
  };
  const handleSwapButtonClick = () => {
    const nextVariantList = [...variantList];

    if (typeof swapFirst !== 'undefined' && typeof swapSecond !== 'undefined') {
      const tmp = nextVariantList[swapFirst];
      nextVariantList[swapFirst] = nextVariantList[swapSecond];
      nextVariantList[swapSecond] = tmp;
    }

    setVariantList(nextVariantList);
    setSwapFirst(undefined);
    setSwapSecond(undefined);
  };

  const Animation = animationComponentById[variantAnimation];

  return (
    <main className="main">
      <div className="controls">
        <AnimationSelect
          defaultValue={variantAnimation}
          onChange={setVariantAnimation}
          options={options}
        />
        <div className="swap">
          <Input
            value={swapFirst}
            type="number"
            onChange={({ target: { value } }) =>
              handleChangeSwapValue(value, setSwapFirst)
            }
            placeholder="этот"
            min={0}
            max={variantList.length}
          />
          <Input
            value={swapSecond}
            type="number"
            onChange={({ target: { value } }) =>
              handleChangeSwapValue(value, setSwapSecond)
            }
            placeholder="тот"
            min={0}
            max={variantList.length}
          />
          <Button disabled={disabled} onClick={handleSwapButtonClick}>
            Поменять
          </Button>
        </div>
      </div>

      <div className="content">
        <VariantList variantList={variantList} Animation={Animation} />
      </div>
    </main>
  );
}

export default App;
