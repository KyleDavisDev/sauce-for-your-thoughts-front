import { ISauce } from "../interface/sauce";
import { IUser } from "../interface/user";
import { IReview } from "../interface/review";

export interface IState {
  flashMessage: {
    isVisible: boolean;
    type: null;
    text: null | string;
    slug: null;
  };
  sauces: {
    allIds: number[];
    byId: { [key: string]: ISauce };
    total: number;
    query: {};
  };
  sauce: ISauce; // Remove this...?
  tags: string[]; // Remove this..?
  users: {
    allIds: number[];
    byId: { [key: string]: IUser };
    self: { token: null | string };
  };
  reviews: { allIds: number[]; byId: { [key: string]: IReview } };
}
