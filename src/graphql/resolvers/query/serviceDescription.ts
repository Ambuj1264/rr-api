import { ServiceDescription } from "../../../database/services/service-description";

export const serviceDescriptionPage = async (_: any) => {
  const findServiceDescription = await ServiceDescription.find({
    where: {
      isDeleted: false,
    },
  });
  
  return findServiceDescription[0];
};
