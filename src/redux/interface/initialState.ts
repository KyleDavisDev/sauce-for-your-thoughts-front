import { ISauce } from "./sauce";
import { IUser } from "./user";
import { IReview } from "./review";
import { IFlashMessage } from "./flashMessage";

export interface IinitialState {
  flashMessage: IFlashMessage;
  sauces?: {
    allIds: null | number[];
    byId: null | { [key: string]: ISauce };
    total: null | number;
    query: null | {};
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
