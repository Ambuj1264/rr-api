import { Footer } from "../../../database/footer/footer";
import { GraphQLContext } from "../../utility/graphql";

export const footerData = async (
  _: any,__: any,  
  context : GraphQLContext) => 
  {
  const footerData = await Footer.findOne({
    where: {
      isDeleted: false,
    },
  });
  if (!footerData) {
    
    return null;
  }

  return {
    id: footerData?.id,
    footerLogo: footerData?.footerLogo,
    footerDescription: footerData?.footerDescription,
    socialMedia: [
      {
        facebook: footerData?.facebook,
        instagram: footerData?.instagram,
        linkedin: footerData?.linkedin,
        twitter: footerData?.twitter,
      },
    ],
  };
};
