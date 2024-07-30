  import jwt, { JwtPayload } from "jsonwebtoken";
import yenv from "yenv";
import { GraphQLContext } from "../utility/graphql";
const env = yenv("env.yaml", { env: "development" });

export const authMiddleware = async (req: any): Promise<any> => {
  const token = getToken(req.headers.authorization);
  const integrationToken = env.JWT_SECRET;
  const authorizationToken = req.headers.authorization || "";
  // check if the request is for the signup mutation

  const isSignupMutation =
    req?.body?.query?.includes("login(") ||
    req?.body?.query?.includes("createUser(") ||
    req?.body?.query?.includes("loginReset(") ||
    req?.body?.query?.includes("changePassword(") ||
    req?.body?.query?.includes("createReservation(") ||
    req?.body?.query?.includes("HomePage") ||
    req?.body?.query?.includes("basicPackage(") ||
    req?.body?.query?.includes("superDeluxePackage(") ||
    req?.body?.query?.includes("deluxePackage(") ||
    req?.body?.query?.includes("packageData(") ||
    req?.body?.query?.includes("serviceListing") ||
    req?.body?.query?.includes("FindService(") ||
    req?.body?.query?.includes("reservationFormSingleDataForUI(") ||
    req?.body?.query?.includes("servicePageDataListing") ||
    req?.body?.query?.includes("serviceListingOfTopFive") ||
    req?.body?.query?.includes("FindSlotByDate") ||
    req?.body?.query?.includes("verifyToken("); 

  // skip authorization check for signup mutation
  if (isSignupMutation) {
      return { 
        loginId: authorizationToken?.loginId,
         userId: authorizationToken?.oid, 
        // permissions: authorizationToken?.permissions 
      };
  }

  if (token) {
    try {
      // Verify the token using the secret key
      const decodedToken = (
        await jwt.verify(token, integrationToken
        )) as JwtPayload;

      return { 
        loginId: decodedToken.loginId,
         userId: decodedToken.oid,
       
        } as GraphQLContext;
    } catch (err) {
      throw new Error("Invalid or expired token");
    }
  } else {
    throw new Error("Authorization header missing");
  }
};

const getToken = (authHeader: string | undefined) => {
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  return null;
};
