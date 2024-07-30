import { User } from "../../../database/user/user";
import { CreateUserInput } from "../../../types/user";
import { dataLoaders } from "../../resolvers/dataloaders";
import { createLogin } from "./login";

export const createUserMutation = async (
  _: null,
  { input }: { input: CreateUserInput }
): Promise<User> => {
  const { email, password, firstName, lastName, ...rest } = input;
  // regex email to verify it is a valid email pattern
  // Check to see that user has not been added previously to avoid duplicates./
  const { emailIsDuplicated, errorMessage } = await checkEmailDuplication(
    email
  );
  if (emailIsDuplicated) throw new Error(errorMessage);
  // Insert new entity
  const userId = await User.createQueryBuilder()
    .insert()
    .values({
      email: email.toLowerCase(),
      firstName,
      lastName,
      ...rest,
    })
    .output("*")
    .execute()
    .then((response) => {
      if (!Array.isArray(response.raw) || response.raw.length === 0) {
        throw new Error("Failed to create user");
      }

      return response.identifiers[0].id;
    });

  await createLogin({
    userId: userId,
    email: email.toLowerCase(),
    password: password,
    firstName: firstName,
    lastName: lastName,
  });

  return dataLoaders.userLoader.load(userId);
};

interface UserDuplicationResult {
  emailIsDuplicated: boolean;
  errorMessage?: string;
}

export const checkEmailDuplication = async (
  email: string
): Promise<UserDuplicationResult> => {
  let result: UserDuplicationResult = {
    emailIsDuplicated: false,
  };

  // Check email of new user
  const sanitizedEmail = email.trim().toLowerCase();
  const userEmail = await User.createQueryBuilder("user")
    .where("LOWER(TRIM(email)) like :email", {
      email: `${sanitizedEmail}%`,
    })
    .getOne();
  if (userEmail) {
    result = {
      emailIsDuplicated: true,
      errorMessage: `Email already exists`,
    };
  }

  return result;
};
