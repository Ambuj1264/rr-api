import { In } from "typeorm";
import { Items } from "../../../../database/user-interface/items";
import { Packages } from "../../../../database/user-interface/Packages";

export interface AddItemInterface {
  basicQuantity: number;
  deluxeQuantity: number;
  isDeleted: boolean;
  superDeluxeQuantity: number;
  itemName: string;
}
export interface AddProductInterface {
  service: string;
  items: any;
  basic: boolean;
  deluxe: boolean;
  superDeluxe: boolean;
  basicPackagePrice: number;
  deluxePackagePrice: number;
  superDeluxePackagePrice: number;
}
export interface EditItemsInterface extends AddProductInterface {
  id: string;
}
export const checkItemIsAlreadyRegister = async (itemName: string) => {
  const responseData = await Items.find({
    where: {
      isDeleted: false,
      itemName: itemName,
    },
  });

  return { alreadyRegister: responseData.length > 0 };
};
export const createPackage = async (
  _: null,
  { input }: { input: AddProductInterface }
): Promise<any> => {
  const checkServiceExist: any = await Packages.findOne({
    where: {
      isDeleted: false,
      service: input.service,
    },
  });
  if (checkServiceExist?.service === input?.service) {
    throw new Error("Package is already created");
  }
  const result = await Packages.createQueryBuilder()
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

export interface DeleteProductItemInput {
  id: string;
}

export const deletePackage = async (
  _: any,
  id: DeleteProductItemInput
): Promise<any> => {
  try {
    const deleteItem = await Packages.findOne({
      where: {
        id: id?.id,
        isDeleted: false,
      },
    });

    if (!deleteItem) {
      throw new Error("item is not found");
    }
    deleteItem.isDeleted = true;

    return await deleteItem.save();
  } catch (error: any) {
    throw new Error(`Failed to delete : ${error.message}`);
  }
};

export const bulkPakagesDelete = async (_: any, ids: { ids: any }) => {
  const findItems = await Packages.find({
    where: {
      id: In(ids.ids),
    },
  });

  const updatedItems = await Promise.all(
    findItems.map(async (item) => {
      item.isDeleted = true;

      return item.save();
    })
  );

  return updatedItems;
};

export const updatePackage = async (
  _: any,
  { input }: { input: any }
): Promise<any> => {
  try {
    const edit = await Packages.update(
      {
        isDeleted: false,
        id: input?.id,
      },
      {
        ...input,
      }
    );
    if (!edit.affected) {
      return null;
    }

    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
