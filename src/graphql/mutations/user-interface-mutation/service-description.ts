import { ServiceDescription } from "../../../database/services/service-description";
import { ServiceDescriptionTypes } from "../../../types/services/service-description";

interface Result {
  alreadyRegister: boolean;
}

export const createServiceDescriptionDetails = async (
  _: any,
  { input }: { input: ServiceDescriptionTypes }
): Promise<any> => {
  const alreadyRegistered = await checkDescriptionIsAlreadyRegister();
   if (alreadyRegistered?.alreadyRegister) {
    const updatedResponse = await updateServiceDescription(input);

    return updatedResponse;
  } else {
    const result = await insertServiceDescription(input);

    return result;
  }
};

const updateServiceDescription = async (input: any): Promise<any> => {
  if (Object.keys(input).length === 0) {
    const footerRes = await ServiceDescription.find({
      where: {
        isDeleted: false,
      },
    });
    input = footerRes[0];
  }

  const updatedResponse = await ServiceDescription.update({isDeleted: false}, input);
  if (updatedResponse.affected) {
    const findUpdatedResponse = await ServiceDescription.find({
      where: {
        isDeleted: false,
      },
    });

    return findUpdatedResponse[0];
  } else {
    return null;
  }
};

const insertServiceDescription = async (
  input: ServiceDescriptionTypes
): Promise<any> => {
  const result = await ServiceDescription.createQueryBuilder()
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

      return response.raw[0];
    });

  return result;
};

export const checkDescriptionIsAlreadyRegister = async (): Promise<Result> => {
  const responseData = await ServiceDescription.find({
    where: {
      isDeleted: false,
    },
  });

  return { alreadyRegister: responseData.length > 0 };
};
export const deleteServiceDescrition = async (_: any, id: { id: string }) => {
  const responseData: any = await ServiceDescription.findOne({
    where: {
      isDeleted: false,
      id: id?.id,
    },
  });
  if (!responseData) {
    throw new Error("data is not find");
  }
  responseData.isDeleted = true;
  
  return await responseData.save();
};
