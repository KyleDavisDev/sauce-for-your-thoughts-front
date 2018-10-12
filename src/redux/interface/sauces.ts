import { ISauce } from "./sauce";

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface Sauces {
  readonly allIds: null | number[];
  readonly byId: null | { [key: string]: ISauce };
  readonly total: null | number;
  readonly query: null | {};
}
