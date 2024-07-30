import { Header } from "../../../database/user-interface/navbar";

export const headerData = async (_: any) => {
  try {
    return await Header.findOne({
      where: {
        isDeleted: false,
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
