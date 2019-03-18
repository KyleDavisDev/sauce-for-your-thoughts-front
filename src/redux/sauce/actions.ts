import { API } from "../../utils/api/Api";

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
 *  @param {String} slug - keyword to lookup
 *  @returns {Promise}
 *    @returns {String}
 */
export const getSauceBySlug = ({
  data
}: {
  data: { sauce: { slug: string } };
}) => async (dispatch: any): Promise<null> => {
  return API.sauce.getBySlug(data).then(res => {});
};
