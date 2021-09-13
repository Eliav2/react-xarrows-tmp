import { MaybeContains } from '../privateTypes';

export type basicPos = MaybeContains<{ x1: number; y1: number; x2: number; y2: number }>;
// export type basicPos = {};
export type extendPosType = ((pos: basicPos) => basicPos) | undefined;

export function getPathState(): string;
export function getPathState(
  extendPos?: extendPosType | undefined,
  pathFunc?: (pos: basicPos) => string,
  initialPos?: basicPos
): getPathStateType;
/**
 * receives an optional function to extend. if no extending function was given return the updated pos state
 *
 * simple words: 2 options:
 *  if you call this function with argument (of function to extend current pos state) it will return a new instance of this function with updated pos.
 *  if you call this function with no arguments it should return a function that when called will return a string representing the desired path.
 *
 * @param extendPos function that receives as first argument the current path state, this function should return the new path state
 * @param pathFunc
 * @param initialPos
 */
export function getPathState<T extends extendPosType>(
  extendPos?: T,
  pathFunc?: (pos: basicPos) => string,
  initialPos: basicPos = {}
) {
  if (extendPos) {
    let newPos = extendPos({ ...initialPos });
    return (newExtendPos, newPathFunc = pathFunc, _newPos = newPos) => getPathState(newExtendPos, newPathFunc, _newPos);
  } else {
    if (pathFunc) return pathFunc(initialPos);
    else return initialPos;
  }
}

export type getPathStateType = typeof getPathState;
