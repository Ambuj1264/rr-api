import { dataLoaders } from "../dataloaders";

// data loader
export const clearCacheQuery = async (
  _: any,
  { entries }: { entries: { path: string; id: string }[] }
) => {
  await Promise.all(entries?.map(async ({ path, id }) => {
    switch (path) {
      case "user":
        if (!id ) {
          throw new Error(`user id required`);
        }
        dataLoaders.loginLoader.clear(id);
        dataLoaders.userLoader.clear(id);
        break;
     
    }
  }));
};
