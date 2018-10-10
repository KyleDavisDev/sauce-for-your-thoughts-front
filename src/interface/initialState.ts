import { ISauce } from "../interface/sauce";
import { IUser } from "../interface/user";
import { IReview } from "../interface/review";
import { IFlashMessage } from "../interface/flashMessage";

export interface IState {
  flashMessage: IFlashMessage;
  sauces?: {
    allIds: number[];
    byId?: { [key: string]: ISauce };
    total?: number;
    query?: {};
  };
  sauce?: ISauce; // Remove this...?
  tags?: string[]; // Remove this..?
  users?: {
    allIds: number[];
    byId: { [key: string]: IUser };
    self: { token: null | string };
  };
  reviews?: { allIds: number[]; byId: { [key: string]: IReview } };
}
