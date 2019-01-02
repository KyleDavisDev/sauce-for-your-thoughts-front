// User shape
export interface IUser {
  _id: number;
  reviews: string[];
  created: Date;
  name: string;
  email?: string;
}

// Trimmed down for reference only
export interface IUserRef {
  _id: string;
}
