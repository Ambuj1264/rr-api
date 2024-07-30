import { In } from "typeorm";
import { Services } from "../../../database/services/service";
import { ServicesTypes } from "../../../types/services/service";
import { ServicePageDetails } from "../../../database/user-interface/servicePage";
import path from "path";
import fs from "fs/promises";

export const createServiceDescriptionDetails = async (
  _: any,
  { input }: { input: ServicesTypes }
): Promise<any> => {
  const result = await Services.createQueryBuilder()
    .insert()
    .values({
      ...input,
      serviceName: input.serviceName.toLowerCase(),
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

export const deleteServices = async (_: any, id: { id: string }) => {

  try {
    const deleteImage: any = await Services.findOne({
      where: {
        id: id?.id,
        isDeleted: false,
      },
    });

    if (!deleteImage) {
      // Handle the case when the record is not found
      throw new Error("Header not found");
    }
    const imageName = deleteImage?.serviceImageName;
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

export const bulkServicesDelete = async (_: any, ids: { ids: any }) => {
  // Find services with the provided IDs
  const findServices = await Services.find({
    where: {
      id: In(ids.ids),
    },
  });

  // Use `Promise.all` to update and save each service
  const updatedServices = await Promise.all(
    findServices.map(async (service) => {
      service.isDeleted = true;

      return service.save(); // Fixed the incorrect use of `updatedServices.save()`
    })
  );

  return updatedServices;
};

export const updateServicePriority = async (_: any, id: any ) => {
 try {
  const updateServices: any = await Services.findOne({
    where: {
      id: id?.id
    }
  });
  if (!updateServices) {
    throw new Error("Data is not found");
  }
  updateServices.priority = id.priority;

  return  await updateServices.save();
 } catch (error) {
  throw new Error("Something went wrong");
 }
  };

  export const deleteServicesPageDescription = async (_: any, id: { id: string }) => {

    try {
      const deleteImage: any = await ServicePageDetails.findOne({
        where: {
          id: id?.id,
          isDeleted: false,
        },
      });
  
      if (!deleteImage) {
        // Handle the case when the record is not found
        throw new Error("Header not found");
      }
      const imageName = deleteImage?.serviceBanner;
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
