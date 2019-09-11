// Return interface
export interface IErrReturn {
  response: { data: { msg: string; status: number; isGood: boolean } };
}

// Params interface
interface IErrParams {
  msg: string;
  status: number;
  isGood?: boolean;
}

// Function designed to resemble how a network error would look like.
// This will help the catch(err) only have to handle a single format
const Err = ({ msg, status, isGood = false }: IErrParams): IErrReturn => {
  return {
    response: {
      data: {
        status,
        msg,
        isGood
      }
    }
  };
};

export default Err;
