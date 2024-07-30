import DataLoader from "dataloader";
import { User } from "../../../database/user/user";
import { getUsers, getLogins } from "./userLoader";
import { Login } from "../../../database/login/login";

const cacheProp = { cache: true };
export const dataLoaders = {
  userLoader: new DataLoader<string, User>(getUsers, cacheProp),
  loginLoader: new DataLoader<string, Login>(getLogins, cacheProp),
};
