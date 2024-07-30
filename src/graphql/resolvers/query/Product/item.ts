import { ContextInterface } from "../../../../context/context";
import { Items } from "../../../../database/user-interface/items";

export const productItemsListing = async (
  _: any,
  contextValue: ContextInterface
) => {
  return await Items.find({
    where: {
      isDeleted: false,
    },
    order: {
      // Add your ordering criteria here, for example:
      createdAt: "DESC", // Order by createdAt in descending order
    },
  });
};
