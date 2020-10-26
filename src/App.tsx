import React from 'react';
import { Input, Button } from 'antd';

import { data, options } from './constants';
import { Variant } from './components/Variant';
import { VariantList } from './components/VariantList';
import { AnimationSelect } from './components/AnimationSelect';
import { EVariantAnimation } from './enums/EVariantAnimation';

import 'antd/dist/antd.css';
import './App.css';

function App() {
  const [variantList, setVariantList] = React.useState<typeof data>(data);
  const [variantAnimation, setVariantAnimation] = React.useState<
    EVariantAnimation
  >(EVariantAnimation.A);
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
    const nextVariantList = [];
  };

  return (
    <main className="main">
      <div>
        <AnimationSelect
          defaultValue={variantAnimation}
          onChange={setVariantAnimation}
          options={options}
        />
        <div>
          <Input
            value={swapFirst}
            type="number"
            onChange={({ target: { value } }) =>
              handleChangeSwapValue(value, setSwapFirst)
            }
          />
          <Input
            value={swapSecond}
            type="number"
            onChange={({ target: { value } }) =>
              handleChangeSwapValue(value, setSwapSecond)
            }
          />
          <Button disabled={disabled} onClick={handleSwapButtonClick}>
            Swap
          </Button>
        </div>
      </div>

      <VariantList
        variantList={variantList}
        renderVariant={(props) => <Variant key={props.id} {...props} />}
      />
    </main>
  );
}

export default App;
