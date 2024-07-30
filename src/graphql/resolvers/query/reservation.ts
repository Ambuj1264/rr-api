import { Reservation } from "../../../database/user-interface/reservation";

export const getAllReservation = async (_: any) => {
  try {
        return await Reservation.find({
      where: {
        isDeleted: false,
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
