import { IReview } from "../reviews/types";

export interface ISauce {
  _id: number;
  _addedToStore?: Date;
  name: string;
  ingredients: string;
  author: string;
  created: Date;
  types?: string[];
  maker: string;
  description: string;
  photo?: string;
  shu?: number | string;
  reviews?: IReview[];
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  slug?: string;
}

// Trimmed down for reference only
export interface ISauceRef {
  _id?: number | string;
  slug: string;
}
