import { ISauce } from "../sauce/types";

export interface IAction {
  type: string;
  sauces: {
    byId: null | { [key: string]: ISauce };
    allIds: null | number[];
  };
  query: null | { [key: string]: { sauces: number[] } };
  total: number;
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface ISauces {
  readonly allIds: null | number[];
  readonly byId: null | { [key: string]: ISauce };
  readonly total: null | number;
  readonly query: null | {};
}
