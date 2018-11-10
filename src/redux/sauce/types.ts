// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface ISauce {
  _id: number;
  name: string;
  ingredients: string;
  type: string;
  maker: string;
  description: string;
  photo: string;
  shu?: number;
  peppers?: string[];
  reviews?: number[];
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  tags?: string[];
}

// Trimmed down for reference only
export interface ISauceRef {
  _id: number;
}
