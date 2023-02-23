import React from "react";
import { RelativeSize } from "shared/types";
import { getRelativeSizeValue, parseRelativeSize } from "shared/utils";
import { Dir, Vector } from "./path/vector";
import { Line } from "./path/line";
import { usePositionProvider } from "./providers/PositionProvider";
import HeadProvider from "./providers/HeadProvider";
import LocatorProvider from "./providers/LocatorProvider";

export interface XLineProps extends React.SVGProps<SVGLineElement> {
  children?: React.ReactNode;
  stripEnd?: RelativeSize; // how much of the end of the line should be removed
  stripStart?: RelativeSize; // how much of the start of the line should be removed
  component?: React.ElementType<XLineProps>;
  color?: string;
}

export const XLine = React.forwardRef(function XLine(props: XLineProps, ref: React.ForwardedRef<SVGElement>) {
  let {
    component: Component = "line" as const,
    stripEnd,
    stripStart,
    x1,
    y1,
    x2,
    y2,
    color = "cornflowerblue",
    strokeWidth = 3,
    children,
    ...p
  } = props;

  // const { startPoint, endPoint } = usePositionProvider();
  const { startPoint, endPoint } = usePositionProvider();
  if (startPoint) {
    x1 = startPoint.x;
    y1 = startPoint.y;
  }
  if (endPoint) {
    x2 = endPoint.x;
    y2 = endPoint.y;
  }
  // console.log({ startPoint, endPoint });
  if (props.stripEnd || props.stripStart) {
    let l = new Line(new Vector(Number(x1), Number(y1)), new Vector(Number(x2), Number(y2)));
    if (props.stripEnd) {
      l = l.stripEnd(getRelativeSizeValue(props.stripEnd, l.length()));
      x2 = l.end.x;
      y2 = l.end.y;
    }
    if (props.stripStart) {
      l = l.stripStart(getRelativeSizeValue(props.stripStart, l.length()));
      x1 = l.root.x;
      y1 = l.root.y;
    }
  }
  if (!endPoint || !startPoint) return null;
  // console.log("XLine", { startPoint, endPoint });
  const location = (location: RelativeSize) => {
    const v1 = new Vector(Number(x1), Number(y1));
    const v2 = new Vector(Number(x2), Number(y2));
    const line = new Line(v1, v2);
    const lineTotalLength = line.length();
    const dir = line.dir();
    const p = getRelativeSizeValue(location, lineTotalLength);
    return { pos: v1.add(dir.mul(p)), dir: dir };
  };

  return (
    <>
      <Component
        ref={ref as React.ForwardedRef<SVGLineElement>}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        fill="transparent"
        stroke={color}
        strokeWidth={strokeWidth}
        {...p}
      />
      <LocatorProvider value={{ getLocation: location }}>{children}</LocatorProvider>
      {/*<HeadProvider value={{ dir: { x: endPoint.x - startPoint.x, y: endPoint.y - startPoint.y }, color }}>{children}</HeadProvider>*/}
    </>
  );
});

export default XLine;

XLine.defaultProps = {
  component: "line",
  color: "cornflowerblue",
  strokeWidth: 3,
};