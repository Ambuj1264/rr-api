import { Footer } from "../../../database/footer/footer";
import { FooterInput } from "../../../types/footer";

interface FooterResult {
  alreadyRegister: boolean;
}

export const createFooterMutation = async (
  _: null,
  { input }: { input: FooterInput }
): Promise<any> => {
  return await insertFooter(input);
};
const insertFooter = async (input: FooterInput): Promise<any> => {
  const result = await Footer.createQueryBuilder()
    .insert()
    .values({
      ...input,
    })
    .output("*")
    .execute()
    .then((response) => {
      if (!Array.isArray(response.raw) || response.raw.length === 0) {
        throw new Error("Failed to save data");
      }

      return {
        id: response?.raw[0]?.id,
        footerLogo: response?.raw[0]?.footerLogo,
        footerDescription: response.raw[0]?.footerDescription,
        socialMedia: [
          {
            facebook: response.raw[0].facebook,
            twitter: response.raw[0].twitter,
            instagram: response.raw[0].instagram,
            linkedin: response.raw[0].linkedin,
          },
        ],
      };
    });

  return result;
};

export const checkFooterIsAlreadyRegister = async (): Promise<FooterResult> => {
  const responseData = await Footer.find({
    where: {
      isDeleted: false,
    },
  });

  return { alreadyRegister: responseData.length > 0 };
};

export interface DeleteFooterInput {
  id: string;
}
export interface EditFooterInterface {
  id: string;
  footerLogo: string;
  footerDescription: string;
  isDeleted: boolean;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
}

export const deleteFooter = async (
  _: any,
  id: DeleteFooterInput
): Promise<any> => {
  try {
    const deleteFoot = await Footer.findOne({
      where: {
        id: id?.id,
        isDeleted: false,
      },
    });

    if (!deleteFoot) {
      throw new Error("Footer not found");
    }

    deleteFoot.isDeleted = true;
    await deleteFoot.save();

    return {
      id: deleteFoot.id,
      footerLogo: deleteFoot.footerLogo,
      footerDescription: deleteFoot.footerDescription,
      isDeleted: deleteFoot.isDeleted,
      socialMedia: [
        {
          facebook: deleteFoot?.facebook,
          twitter: deleteFoot?.twitter,
          instagram: deleteFoot?.instagram,
          linkedin: deleteFoot?.linkedin,
        },
      ],
    };
  } catch (error: any) {
    throw new Error(`Failed to delete footer: ${error.message}`);
  }
};
export const editFooter = async (
  _: any,
  { input }: { input: EditFooterInterface | null }
): Promise<any> => {
  const responseData: any = await Footer.findOne({
    where: {
      isDeleted: false,
    },
  });
  let footerLogo;

  if (!input?.footerLogo) {
    footerLogo = responseData.footerLogo;
  }
  let id;
  if (!input?.id) {
    id = responseData.id;
  }

  let footerDescription;

  if (!input?.footerDescription) {
    footerDescription = responseData.footerDescription;
  }
  let facebook;

  if (!input?.facebook) {
    facebook = responseData.facebook;
  }
  let twitter;

  if (!input?.twitter) {
    twitter = responseData.twitter;
  }
  let linkedin;
  if (!input?.linkedin) {
    linkedin = responseData.linkedin;
  }
  let instagram;
  if (!input?.instagram) {
    instagram = responseData.instagram;
  }
  const edit = await Footer.update(
    {
      isDeleted: false,
      id: input?.id ? input?.id : id,
    },
    {
      footerLogo: input?.footerLogo ? input?.footerLogo : footerLogo,
      footerDescription: input?.footerDescription
        ? input?.footerDescription
        : footerDescription,
      facebook: input?.facebook ? input?.facebook : facebook,
      instagram: input?.instagram ? input?.instagram : instagram,
      linkedin: input?.linkedin ? input?.linkedin : linkedin,
      twitter: input?.twitter ? input?.twitter : twitter,
    }
  );
  if (!edit.affected) {
    return null;
  }
  
  return true;
};
