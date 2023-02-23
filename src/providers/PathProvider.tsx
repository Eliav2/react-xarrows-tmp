import React from "react";
import { IDir, IPoint, IVector } from "../types";
import { Dir, pointsToCurves, Vector } from "../path";
import { childrenRenderer } from "../internal/Children";
import { createProvider } from "./createProvider";
import produce from "immer";

interface PathProviderVal {
  pointsToPath: (points: IVector[]) => string;
}

const {
  Provider: PathProvider,
  useProvider: usePathProvider,
  useProviderRegister: usePathProviderRegister,
} = createProvider<PathProviderVal>("PathProvider", { defaultVal: { pointsToPath: pointsToCurves } });
export { PathProvider, usePathProvider, usePathProviderRegister };
export default PathProvider;

// export type PathProps = {
//   children?: React.ReactNode;
//   value: { pointsToPath?: (points: IVector[]) => string };
// };
//
// const PathProvider = React.forwardRef(function PathProvider(props: PathProps, forwardedRef) {
//   const {
//     children,
//     value: { pointsToPath = pointsToCurves },
//   } = props;
//   const val = { pointsToPath };
//   return (
//     <PathProviderContext.Provider value={val}>
//       {/*{(children && React.isValidElement(children) && React.cloneElement(children, { ref: forwardedRef } as any)) || children}*/}
//       {childrenRenderer(children, val, forwardedRef)}
//     </PathProviderContext.Provider>
//   );
// });
//
// type PathProviderContextProps = {
//   pointsToPath: (points: IVector[]) => string;
// };
// const PathProviderContext = React.createContext<PathProviderContextProps>({ pointsToPath: () => "" });
//
// export const usePathProvider = () => {
//   return React.useContext(PathProviderContext);
// };
//
// export default PathProvider;