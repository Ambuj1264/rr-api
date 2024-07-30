import { In } from "typeorm";
import { Login } from "../../../database/login/login";
import { User } from "../../../database/user/user";
import { chunkEntitiesLookup } from "../../utility/entity";

export const getUsers = async (ids: readonly string[]): Promise<User[]> => {
  const entityMap: Map<string, User> = new Map();
  const _ids = ids.map((id) => `${id}`);
  (await chunkEntitiesLookup(_ids)).forEach((entity) =>
    entityMap.set(entity.id, entity)
  );

  return _ids
    .map((inputId) => {
      const entity = entityMap.get(inputId);
      if (entity) {
        return {
          ...entity,
        } as User;
      }

      return null;
    })
    .filter((user): user is User => user !== null);
};

export const getLogins = async (
  userIds: readonly string[]
): Promise<Login[]> => {
  const loginMap: Map<string, Login> = new Map();
  const logins = await Login.find({ where: { userId: In(userIds) } });
  logins.forEach((login) => loginMap.set(login.userId, login));

  return userIds.map((inputId) => loginMap.get(inputId), null) as Login[];
};
