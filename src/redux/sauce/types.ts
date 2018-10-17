// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface ISauce {
  _id: number;
  maker: string;
  shu: null | number;
  location?: {
    city: null | string;
    state: null | string;
    country: null | string;
  };
  description: string;
  peppers: null | string[];
  tags?: string[];
}

// Trimmed down for reference only
export interface ISauceRef {
  _id: number;
}
