import { API } from "../../utils/api/Api";
import { addedSauces } from "../sauces/actions";

/** @description Add sauce to DB
 *  @param {Object} data - Form Data that has been JSONified
 *    @param {Object} data.user - author of the sauce
 *      @param {String} data.user.token - unique string
 *    @param {ISauce} data.sauce - sauce object
 *  @returns {Promise}
 *    @returns {String} slug - unique sauce slug
 */
export const addSauce = ({ formData }: { formData: FormData }) => async (
  dispatch: any
): Promise<null> => {
  return API.sauce.add({ formData }).then((res: any) => {
    const { slug } = res.data.sauce;

    return slug;
  });
};

/** @description grab single sauce related to slug
 *  @param {Object} data - object containing slug we are interested in
 *    @param {Object} data.sauce  - sauce container
 *      @param {String} data.sauce.slug - unique sauce slug
 *
 *  @returns {Promise}
 *  @fires sauces.addsauce - add sauce to redux store
 *  @resolves {Object} res.data - relevant info to request
 *
 *  {Boolean} res.data.isGood - whether request was good or not
 *
 *  {ISauce} res.data.sauce - sauce data
 *
 *  @reject {String} error message
 */
export const getSauceBySlug = ({
  data
}: {
  data: { sauce: { slug: string } };
}) => async (dispatch: any): Promise<null> => {
  return API.sauce.getBySlug({ data }).then((res: any) => {
    const { slug } = res.data.sauce;

    // Push sauce into redux store
    // dispatch(addedSauces({}))
    return slug;
  });
};
