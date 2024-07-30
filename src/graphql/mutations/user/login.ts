import MailService from "../../../config/mailService";
import { Login } from "../../../database/login/login";
import { LoginResetInput } from "../../../types/auth";
import { CreateLoginInput } from "../../../types/user";
import { dataLoaders } from "../../resolvers/dataloaders";
import { generateHash } from "../../utility/commonMethod";
import jwt from "jsonwebtoken";
import yenv from "yenv";
import { changePasswordTemplate } from "../../utility/emailTemplate";
import { generateToken } from "../../resolvers/query/auth";
import { User } from "../../../database/user/user";

const env = yenv("env.yaml", { env: "development" });

export const createLogin = async ({
  userId,
  email,
  password,
  firstName,
  lastName,
  ...rest
}: CreateLoginInput) => {
  let login!: Login;
  let _userId!: string;
  const returnVal: any = {};
  if (userId) {
    login = (await User.findOne({ where: { email: email } })) as any;
    const { ...restLogin } = login;
    _userId = userId;
    returnVal.info = { ...restLogin, entityOid: userId };
  }
  const rootUser = await dataLoaders.userLoader.clear(_userId).load(_userId);
  returnVal.token = await generateToken(rootUser, login);

  let hashedPassword;
  password ? (hashedPassword = await generateHash(password)) : null;

  Login.createQueryBuilder()
    .insert()
    .values({
      userId,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      ...rest,
    })
    .output("*")
    .execute()
    .then((response) => {
      if (!Array.isArray(response.raw) || response.raw.length === 0) {
        throw new Error(`Failed to insert user credentials.`);
      }

      return response.identifiers[0].id;
    });
};

export const loginReset = async (
  _: any,
  { input }: { input: LoginResetInput }
) => {
  const { email } = input;
  const lowercaseLoginName = email.toLowerCase();
  const login = await Login.findOneBy({ email: lowercaseLoginName , isDeleted:false});
  if (!login) {
    return new Error("Error: This email does not exist.");
  }
  if (login) {
    const pwChangedTime = new Date(login?.datePwChanged);
    const diff = new Date().getTime() - pwChangedTime.getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    if (minutes < 30) {
      return new Error(
        `The password reset email has already been dispatched. Please retry after a 30-minute interval`
      );
    }
  }
  await Login.createQueryBuilder("login")
    .update()
    .set({
      datePwChanged: new Date(),
    })
    .where({ email: email.toLowerCase() })
    .output("*")
    .execute()
    .then((response) => {
      if (!Array.isArray(response.raw) || response.raw.length === 0) {
        throw new Error(`Failed to reset password.`);
      }
    });

  const user = await dataLoaders.userLoader.load(login.userId);
  const userEmail = user.email;
  const expiresIn = "30m";
  const token = await jwt.sign({ email: userEmail }, env.JWT_SECRET, {
    expiresIn: expiresIn,
  });

  const modifiedToken = token.replace(/\./g, "_dev_");

  const mailService = MailService.getInstance();
  await mailService.sendMail(user.id, {
    to: email,
    from: env.SMTP_SENDER,
    subject: "Password Reset",
    html: changePasswordTemplate({
      fullName: user.email,
      token: modifiedToken,
    }),
  });

  return "A password reset email has been dispatched. Kindly review your email inbox";
};

export const changePassword = async (
  _: any,
  { email, password }: { email: string; password: string }
) => {
  const hashedPassword = await generateHash(password);
  try {
    const changePassword = await Login.update(
      { email },
      {
        password: hashedPassword,
      }
    );
    if (!changePassword.affected) {
      throw new Error(`password is not updated`);
    } else {
      return changePassword;
    }
  } catch (error) {
    throw new Error(`Something Went Wrong`);
  }
};
