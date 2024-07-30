import { Services } from "../../../database/services/service";
import { ServicePageDetails } from "../../../database/user-interface/servicePage";

export const serviceListing = async (_: any) => {
  return await Services.find({
    where: {
      isDeleted: false,
    },
    order: {
      // Add your ordering criteria here, for example:
      createdAt: "DESC", 
    },
  });
};
export const servicePageDataListing = async (_: any) => {
  return await ServicePageDetails.find({
    where: {
      isDeleted: false,
    },
  });
};

export const ServicesPage = async (_: any) => {
  const serviceListing = await Services.find({
    where: {
      isDeleted: false,
    },
  });

  return {
    ServiceList: serviceListing,
  };
};

export const serviceListingOfTopFive = async (_: any) => {
  return await Services.find({
    where: {
      isDeleted: false,
      priority: true,
    },
  });
};

export const FindService = async (_: any, id: any) => {
  return await Services.findOne({
    where: {
      id: id?.id,
      isDeleted: false,
    },
  });
};
export const FindServicePageDeatails = async (_: any, id: any) => {
  return await ServicePageDetails.findOne({
    where: {
      id: id?.id,
      isDeleted: false,
    },
  });
};

export const CheckPriority = async (_: any) => {
  return await Services.count({
    where: {
      priority: true,
      isDeleted: false,
    },
  });
};
