import '../../wdyr';
import React, { useEffect, useRef, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import CustomXarrow from '../../../src/Xarrow/XarrowCore';
import Xarrow, { useMultipleRenders, xarrowPropsType, Xwrapper, arrowShapes } from '../../../src';
import { DraggableBox } from '../components/DraggableBox';

export default {
  title: 'XarrowCore',
  component: CustomXarrow,
} as Meta;

const XarrowCoreTestTemplate = (args) => {
  const [showBox1, setShowBox1] = useState(true);
  const [showBox2, setShowBox2] = useState(true);

  return (
    <div>
      <button onClick={() => setShowBox1(!showBox1)}>trigger box1</button>
      <button onClick={() => setShowBox2(!showBox2)}>trigger box1</button>
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-around' }}>
        <Xwrapper>
          {showBox1 ? <DraggableBox id={'box1'} grid={[20, 20]} /> : null}
          {showBox2 ? <DraggableBox id={'box2'} grid={[20, 20]} /> : null}
          {/*<DelayedComponent comp={<CustomXarrow start={'box1'} end={'box2'} />} />*/}
          <CustomXarrow start={'box1'} end={'box2'} idleRenders={1} />
          {/*<svg*/}
          {/*  style={{*/}
          {/*    border: 'solid yellow 1px',*/}
          {/*  }}>*/}
          {/*  <g>*/}
          {/*    <path height={'auto'} width={'auto'} d={'M0,0 L1000,0'} stroke="black" />*/}
          {/*  </g>*/}
          {/*</svg>*/}
        </Xwrapper>
      </div>
    </div>
  );
};

export const XarrowCoreStory: Story<xarrowPropsType> = (args) => <XarrowCoreTestTemplate {...args} />;