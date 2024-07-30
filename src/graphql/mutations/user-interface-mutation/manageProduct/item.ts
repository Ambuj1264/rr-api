import { In } from "typeorm";
import { Items } from "../../../../database/user-interface/items";

export interface AddItemInterface {
  basicQuantity: number;
  deluxeQuantity: number;
  isDeleted: boolean;
  superDeluxeQuantity: number;
  itemName: string;
}
export interface EditItemsInterface extends AddItemInterface {
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
export const createProductItem = async (
  _: null,
  { input }: { input: AddItemInterface }
): Promise<any> => {
  const checkItem = await checkItemIsAlreadyRegister(input?.itemName?.toLowerCase());
  if (checkItem && checkItem.alreadyRegister) {
    throw new Error("Item already exists");
  }
  const result = await Items.createQueryBuilder()
    .insert()
    .values({
      ...input,
      itemName: input.itemName.toLowerCase(),
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

export const deleteProductItem = async (
  _: any,
  id: DeleteProductItemInput
): Promise<any> => {
  try {
    const deleteItem = await Items.findOne({
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
    throw new Error(`Failed to delete footer: ${error.message}`);
  }
};

export const bulkProductItemDelete = async (_: any, ids: { ids: any }) => {
  const findItems = await Items.find({
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

export const updateProductItems = async (
  _: any,
  { input }: { input: EditItemsInterface | null }
): Promise<any> => {
  const responseData: any = await Items.findOne({
    where: {
      isDeleted: false,
      id: input?.id,
    },
  });

  let basicQuantity;
  if (!input?.basicQuantity) {
    basicQuantity = responseData.basicQuantity;
  }
  let id;
  if (!input?.id) {
    id = responseData.id;
  }

  let deluxeQuantity;
  if (!input?.deluxeQuantity) {
    deluxeQuantity = responseData.deluxeQuantity;
  }

  let superDeluxeQuantity;
  if (!input?.superDeluxeQuantity) {
    superDeluxeQuantity = responseData.superDeluxeQuantity;
  }

  let itemName;
  if (!input?.itemName) {
    itemName = responseData.itemName;
  }

  const edit = await Items.update(
    {
      isDeleted: false,
      id: input?.id ? input?.id : id,
    },
    {
      basicQuantity: input?.basicQuantity ? input?.basicQuantity : basicQuantity,
      deluxeQuantity: input?.deluxeQuantity
        ? input?.deluxeQuantity
        : deluxeQuantity,
        superDeluxeQuantity: input?.superDeluxeQuantity ? input?.superDeluxeQuantity : superDeluxeQuantity,
        itemName: input?.itemName ? input?.itemName : itemName
    }
  );
  if (!edit.affected) {
    return null;
  }

  return true;
};

export const findProductItems = async (_: any, {id}: {id: string}) => {
    try {
      const findData =  await Items.findOne({
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