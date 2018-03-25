/** @description Flattens sauce as per https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape.
 *  @param {Object[]} sauces[]  - to be flattened
 *  @param {String} sauces[]._id - unique identifier
 *  @param {String} sauces[].description - description of sauce
 *  @param {String} sauces[].name - name of the sauce
 *  @param {String} sauces[].photo - name of the photo
 *  @param {String[]} sauces[].tags[] - tags assigned to sauce
 *  @param {String} sauces[].author - author of sauce
 *    @param {String} sauces[].author._id - unique identifier
 *    @param {String} sauces[].author.name - author name
 *  @param {Object[]} sauces[].reviews[] - reviews for sauce
 *    @param {String} sauces[].reviews[]._id - unique identifier
 *    @param {String} sauces[].reviews[].text - actual review
 *    @param {Integer} sauces[].reviews[].rating - number of stars given
 *  @returns {Object} sauces, authors, reviews
 */
export const flattenSauces = sauces => {
  //hold all results
  const res = {};

  //init sauces
  res.sauces = {};
  res.sauces.byId = {};
  res.sauces.allIds = [];

  //init authors
  res.authors = {};
  res.authors.byId = {};
  res.authors.allIds = [];

  //init reviews
  res.reviews = {};
  res.reviews.byId = {};
  res.reviews.allIds = [];

  //loop through sauces
  sauces.forEach(sauce => {
    //flatten sauce
    res.sauces.byId[sauce._id] = {
      _id: sauce._id,
      name: sauce.name,
      description: sauce.description,
      photo: sauce.photo,
      tags: sauce.tags,
      author: { _id: sauce.author._id },
      reviews: sauce.reviews.map(x => x._id)
    };

    //add sauce id to array
    res.sauces.allIds.push(sauce._id);

    //flatten authors
    res.authors.byId[sauce.author._id] = {
      _id: sauce.author._id,
      name: sauce.author.name
    };

    //add author id to array
    res.authors.allIds.push(sauce.author._id);

    //loop through array of reviews
    sauce.reviews.forEach(review => {
      //flatten review
      res.reviews.byId[review._id] = {
        _id: review._id,
        text: review.text,
        rating: review.rating,
        author: { _id: review.author._id },
        sauce: { _id: sauce._id }
      };

      //add review id to array
      res.reviews.allIds.push(review._id);
    });
  });

  return res;
};
