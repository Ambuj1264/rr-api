import { Slots } from "../../../database/user-interface/manage-slot";

export const allSlots = async (_: any) => {
  try {
    return await Slots.find({
      where: {
        isDeleted: false,
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const findSlot = async (_: any, id: { id: string }) => {
  try {
    return await Slots.findOne({
      where: {
        id: id?.id,
        isDeleted: false,
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const findSlotByDate = async (_: any, startDate: { startDate: string }) => {
  try {
    return await Slots.findOne({
      where: {
        startDate: startDate?.startDate,
        isDeleted: false,
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
