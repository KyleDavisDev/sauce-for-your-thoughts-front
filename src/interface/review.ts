import { IUserRef } from "./user";
import { ISauceRef } from "./sauce";

export interface IReviewSection {
  rating: number;
  txt: string;
}

export interface IReview {
  _id: number;
  author: IUserRef; // User reference
  sauce: ISauceRef;
  created: Date;
  overall: IReviewSection; // Only review bit that is required
  label?: IReviewSection;
  aroma?: IReviewSection;
  taste?: IReviewSection;
  heat?: IReviewSection;
  note?: IReviewSection;
}

// Trimmed down for reference only
export interface IReviewRef {
  _id: number;
}
