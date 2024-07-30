import bcrypt from "bcrypt";
import { dataLoaders } from "../dataloaders";
import { GraphQLContext } from "../../utility/graphql";
import { getPreferences } from "./users";
import jwt from "jsonwebtoken";
import { Login } from "../../../database/login/login";
import { User } from "../../../database/user/user";
import yenv from "yenv";

const env = yenv("env.yaml", { env: "development" });

export const loginResolver = async (
  _: any,
  { email, password }: { email: string, password: string },
  { userId }: GraphQLContext
) => {

  let login!: Login ;
  let _userId!: string;
  let isPasswordMatch;
  const returnVal: any = {};
 // Convert loginName to lowercase
  const lowercaseLoginName = email.toLowerCase();

  if (email && password) {
    login = await Login.findOneBy({ email: lowercaseLoginName } ) as Login;
    if (login) {
      isPasswordMatch = await bcrypt.compare(password, login.password);
    }
    if (!login || !isPasswordMatch) {
      throw new Error(`Email and password do not match`);
    }
  
    const { password: pw, userId: uid, ...restLogin } = login;
    _userId = uid;

    returnVal.info = { ...restLogin, userId: uid };
  }

  // If loginName and password aren't provided, the user should already
  // be logged in and have a token.
  
  if (login.userId) {
    const inputUser = await dataLoaders.userLoader.load(login.userId);
    const rootUserId = inputUser.id ? inputUser.id : login.userId;
    login = await Login.findOneBy({ userId: rootUserId }) as Login;
    
    const { password: pw, userId: uid, ...restLogin } = login;
    _userId = login.userId;
    // This response shape is for the legalocy REST server
    returnVal.info = { ...restLogin, userId: login.userId };
  }
  
  const rootUser = await dataLoaders.userLoader.clear(_userId).load(_userId);
  returnVal.token = (await generateToken(rootUser, login));
  
  return returnVal;
};

export const generateToken = async (
  user: User,
  login: Login,
) => {
  const preferences = await getPreferences({ userId: user.id });
  const { permissions = [] } = preferences;

  const tokenPayload = {
    oid: user.id,
    loginId: login.id,
    email: user.email,
  };

  const now = new Date();
  const nowInSeconds = Math.round(now.getTime() / 1000);
  const exp = in1Day(nowInSeconds);
  const secret = env.JWT_SECRET;

  const token = jwt.sign({
    ...tokenPayload,
    iat: nowInSeconds,
    exp
  }, secret);
  
  return { token, permissions};
};

const secondsPerDay = 86400;

const in1Day = (nowInSeconds: number): number => {
  
  return nowInSeconds + secondsPerDay;
};