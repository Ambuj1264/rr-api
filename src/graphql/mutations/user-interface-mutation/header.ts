import path from "path";
import { Header } from "../../../database/user-interface/navbar";
import fs from "fs/promises";

export interface DeleteHeaderInput {
  id: string;
}

export const deleteHeader = async (_: any, id: DeleteHeaderInput) => {
  try {
    const deleteImage: any = await Header.findOne({
      where: {
        id: id?.id,
        isDeleted: false,
      },
    });

    if (!deleteImage) {
      // Handle the case when the record is not found
      throw new Error("Header not found");
    }
    const imageName = deleteImage?.imageName;
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "public",
      "upload",
      imageName
    );

    if (await fileExists(filePath)) {
      // Delete the file asynchronously
      await fs.unlink(filePath);
      deleteImage.isDeleted = true;
      await deleteImage.save();

      return deleteImage;
    }
  } catch (error: any) {
    throw error; // Rethrow the error to let the caller handle it
  }
};

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);

    return true;
  } catch (error) {
    return false;
  }
}
