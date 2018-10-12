// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface IFlashMessage {
  readonly isVisible: boolean;
  readonly type: null | string;
  readonly text: null | string;
  readonly slug: null | string;
}
