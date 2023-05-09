import Joi from "joi";
import nc from "next-connect";

import algoliaSearch from "algoliasearch";
import { authenticationMiddleware } from "../../token/verify";
import { IAlgoliaIndex } from "@models/algolia.model";

const { ALGOLIA_APPLICATION_ID, ALGOLIA_ADMIN_API_KEY } = process.env;

const client = algoliaSearch(ALGOLIA_APPLICATION_ID, ALGOLIA_ADMIN_API_KEY);
const index = client.initIndex(IAlgoliaIndex.USERS);

// Define schema for customer
export const querySchema = Joi.object({
  query: Joi.string().required(),
});

const algoliaSearchHandler = async (req, res) => {
  const payload = await querySchema.validateAsync(req?.query);
  const query = payload?.query;

  try {
    const searchParams: any = {
      attributesToRetrieve: [
        "firstName",
        "email",
        "lastName",
        "company",
        "phone",
        "gender",
        "id",
        "userID",
      ],
      hitsPerPage: 10,
    };

    const { hits } = await index.search(query, searchParams);
   const users = hits;

    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Internal server error" });
  }
};

export default nc().use(authenticationMiddleware).get(algoliaSearchHandler);
