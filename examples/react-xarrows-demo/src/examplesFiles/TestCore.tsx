import React, { useState } from "react";
// import Xarrow, { Xwrapper } from "react-xarrows";
// import CustomXarrow from 'react-xarrows/src/Xarrow/XarrowCore';
import { DraggableBox } from "../components/DraggableBox";
// import { Xwrapper } from 'react-xarrows/src';

const XarrowCoreTest = () => {
  const [showBox1, setShowBox1] = useState(true);
  const [showBox2, setShowBox2] = useState(true);

  return (
    <div>
      <button onClick={() => setShowBox1(!showBox1)}>trigger box1</button>
      <button onClick={() => setShowBox2(!showBox2)}>trigger box1</button>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <DraggableBox id={"box1"} grid={[20, 20]} />
        {/*<Xwrapper>*/}
        {showBox1 ? <DraggableBox id={"box1"} grid={[20, 20]} /> : null}
        {showBox2 ? <DraggableBox id={"box2"} grid={[20, 20]} /> : null}
        {/*  /!*<DelayedComponent comp={<XarrowCore start={'box1'} end={'box2'} />} />*!/*/}
        {/*<Xarrow start={"box1"} end={"box2"} />*/}
        {/*</Xwrapper>*/}
      </div>
    </div>
  );
};
export default XarrowCoreTest;