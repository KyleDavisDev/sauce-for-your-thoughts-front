// Sauce shape
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
}

// Trimmed down for reference only
export interface ISauceRef {
  _id: number;
}
