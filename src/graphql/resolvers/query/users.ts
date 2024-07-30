import { User } from "../../../database/user/user";
import { GraphQLContext } from "../../utility/graphql";
import { dataLoaders } from "../dataloaders";

// Merge user preferences, with the user taking priority.
interface Permissions {
  permissions: string[];
}

export const getPreferences = async (args: { userId: string }) => {
  const { userId } = args;
  await dataLoaders.userLoader.load(userId);
  const userPrefs: Permissions = { permissions: [] };

  return userPrefs;
};

export const getUserDetailsByIdResolver = async (
  _: any,
  { id }: { id: string },
  { userId }: GraphQLContext
): Promise<User> => {
  return dataLoaders.userLoader.load(id);
};
