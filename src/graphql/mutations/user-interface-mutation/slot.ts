


import { In } from "typeorm";
import { Slots } from "../../../database/user-interface/manage-slot";
import { SlotInput, UpdateSlotInput } from "../../utility/slot";

export const createSlot = async (
  _: any,
  input: { input: SlotInput }
): Promise<any> => {
  try {
    const result = await checkSlotAvailability(input);
    if (result && result?.length) {
      throw new Error("Already Slot is created for this date");
    } else {
      const createSlot = Slots.create({ ...input?.input });
      
      return await createSlot.save();
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const updateSlot = async (
  _: any,
  input: { input: UpdateSlotInput }
): Promise<any> => {
  try {
    const result = await checkSlotAvailability(input);
    if (result && result?.length) {
      throw new Error("Already Slot is created for this date");
    } else {
      const update = await Slots.update(
        {
          id: input.input.id,
        },
        {
          ...input.input,
        }
      );
      if (update?.affected) {
        return await Slots.findOne({
          where: {
            id: input?.input?.id,
            isDeleted: false,
          },
        });
      } else {
        throw new Error("Data is not updated");
      }
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteSlot = async (_: any, id: { id: string }) => {
  try {
    const result = await checkSingleSlotAvailability(id);
    if (result) {
      result.isDeleted = true;

      return await result.save();
    } else {
      throw new Error("Data is not deleted");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const bulkDeleteSlots = async (_: any, ids: { ids: string[] }) => {
  try {
    const result = await Slots.find({
      where: {
        id: In(ids?.ids),
      },
    });
    if (result.length) {
      const deleteData = await Promise.all(
        result.map(async (service) => {
          service.isDeleted = true;

          return service.save();
        })
      );

      return deleteData;
    } else {
      throw new Error("Data is not deleted");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
const checkSlotAvailability = async (input: { input: SlotInput }) => {
  return await Slots.find({
    where: {
      startDate: input?.input?.startDate,
      isDeleted: false,
    },
  });
};
const checkSingleSlotAvailability = async (id: { id: string }) => {
  return await Slots.findOne({
    where: {
      id: id?.id,
      isDeleted: false,
    },
  });
};
