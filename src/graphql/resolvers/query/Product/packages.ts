import { In } from "typeorm";
import { Services } from "../../../../database/services/service";
import { Packages } from "../../../../database/user-interface/Packages";
import { Items } from "../../../../database/user-interface/items";

export const findPackages = async (_: any, { id }: { id: string }) => {
  try {
    const findData = await Packages.findOne({
      where: {
        isDeleted: false,
        id: id,
      },
    });
    if (!findData) {
      throw new Error("Data not find");
    }

    return findData;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
export const packagesListing = async (_: any) => {
  const existingAssignedServices = Packages.createQueryBuilder("packages");
  const data = await existingAssignedServices
    .leftJoinAndSelect(
      Services,
      "services",
      "packages.service ::uuid = services.id"
    )
    .where("packages.isDeleted = :isDeleted", { isDeleted: false })
    .orderBy("packages.createdAt", "DESC")
    .getRawMany();

  return data;
};
export const packageSingleData = async (_: any, { id }: { id: string }) => {
  const existingAssignedServices = Packages.createQueryBuilder("packages");
  const data = await existingAssignedServices
    .leftJoinAndSelect(
      Services,
      "services",
      "packages.service ::uuid = services.id"
    )
    .where("packages.id= :id", { id: id })
    .andWhere("packages.isDeleted = :isDeleted", { isDeleted: false })
    .orderBy("packages.createdAt", "DESC")
    .getRawOne();

  return data;
};
export const basicPackage = async (_: any, id: { id: string }) => {
  const getPackge: any = await Packages.findOne({
    where: {
      service: id?.id,
      isDeleted: false,
      basic: true,
    },
  });
  if (!getPackge) {
    return null;
  } else {
    const allItemsId = getPackge?.items?.map((v: { id: string }) => v.id);
    const findAllItems = await Items.find({
      where: {
        id: In(allItemsId),
      },
    });

    return findAllItems;
  }
};
export const deluxePackage = async (_: any, id: { id: string }) => {
  const getPackge: any = await Packages.findOne({
    where: {
      service: id?.id,
      isDeleted: false,
      deluxe: true,
    },
  });
  if (!getPackge) {
    return null;
  } else {
    const allItemsId = getPackge?.items?.map((v: { id: string }) => v.id);
    const findAllItems = await Items.find({
      where: {
        id: In(allItemsId),
      },
    });

    return findAllItems;
  }
};
export const superDeluxePackage = async (_: any, id: { id: string }) => {
  const getPackge: any = await Packages.findOne({
    where: {
      service: id?.id,
      isDeleted: false,
      superDeluxe: true,
    },
  });
  if (!getPackge) {
    return null;
  } else {
    const allItemsId = getPackge?.items?.map((v: { id: string }) => v.id);
    const findAllItems = await Items.find({
      where: {
        id: In(allItemsId),
      },
    });

    return findAllItems;
  }
};
export const packageData = async (_: any, serviceId: { serviceId: string }) => {
  try {
    const getPackge: any = await Packages.findOne({
      where: {
        service: serviceId?.serviceId,
        isDeleted: false,
      },
    });

    return getPackge;
  } catch (error: any) {
  throw new Error(error.message);
  }
};
