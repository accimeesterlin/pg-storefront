import Joi from "joi";
import nc from "next-connect";

import algoliaSearch from "algoliasearch";
import { IAlgoliaIndex } from "@models/algolia.model";

const { ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_API_KEY } = process.env;

const client = algoliaSearch(ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_API_KEY);
const index = client.initIndex(IAlgoliaIndex.PRODUCTS);

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
        "mainImageUrl",
        "name",
        "price",
        "createdAt",
        "price",
        "comparePrice",
        "description",
        "published",
        "slug",
        "sku",
        "costPerItem",
        "id",
        "shopId",
        "vendor",
        "weight",
      ],
      hitsPerPage: 10,
    };

    const { hits } = await index.search(query, searchParams);
   const products = hits;

   console.log("Products: ", products);

    return res.status(200).json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Internal server error" });
  }
};

export default nc().get(algoliaSearchHandler);
