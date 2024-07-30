import { Request, Response } from "express";
import { generateRandomAlphabetString } from "../../../graphql/utility/commonMethod";
import path from "path";
import { baseResponse } from "../../responses";
import { responseMessages } from "../../../graphql/utility/variable";
import { Header } from "../../../database/user-interface/navbar";
import { Services } from "../../../database/services/service";
import { ServicePageDetails } from "../../../database/user-interface/servicePage";

const { fileUploaded } = responseMessages;

interface UploadResult {                                                                
  message: string;
  fileName: string;
}

export const imageUploaderController = {
  start: (req: Request, res: Response) => {
    res.json({ response: "Api is workding" });
  },

  navbarUpload: async (req: any, res: Response) => {
    try {
      const name = req.body.altName;
      const image = req?.files?.image;
      if (image || (image && name)) {
        const responseFromUpload = await upload(req?.files?.image);
        if (!responseFromUpload) {
          return res
            .status(500)
            .send({ success: false, message: "Something went wrong" });
        }

        const { message, fileName } = responseFromUpload;
        const existingNavbar = await Header.find({
          where: {
            isDeleted: false,
          },
        });
        if (existingNavbar.length) {
          existingNavbar[0].imageName = fileName;
          existingNavbar[0].altName = name;

          await existingNavbar[0].save();

          return baseResponse(res, true, message, existingNavbar);
        } else {
          // Create a new record
          const createNavbar = await Header.create({
            imageName: fileName,
            altName: name,
          });
          await createNavbar.save();

          return baseResponse(res, true, message, createNavbar);
        }
      } else if (name || !image) {
        const existingNavbar = await Header.find({
          where: {
            isDeleted: false,
          },
        });
        if (existingNavbar.length) {
          existingNavbar[0].altName = name;
          await existingNavbar[0].save();

          return baseResponse(res, true, "name is updated", existingNavbar);
        } else {
          // Create a new record
          const createNavbar = await Header.create({
            altName: name,
          });
          await createNavbar.save();

          return baseResponse(res, true, "name is added", createNavbar);
        }
      }
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong" });
    }
  },
  serviceUpload: async (req: any, res: Response) => {
    const name = req.body.serviceName;
    const image = req?.files?.image;
    const serviceDescription = req.body.serviceDescription;
    let priority = req.body.priority;
    if (priority === "false") {
      priority = false;
    } else if (priority === "true") {
      priority = true;
    }

    // priority === "true" ? true : true;

    const checkServiceNameIsExist = await Services.findOne({
      where: {
        serviceName: name.toLowerCase(),
        isDeleted: false,
      },
    });
    if (checkServiceNameIsExist) {
      return res.status(202).send({
        success: false,
        message: "Service name is Already exist",
        data: checkServiceNameIsExist,
      });
    }
    try {
      const responseFromUpload = await upload(image);
      if (!responseFromUpload) {
        return res
          .status(400)
          .send({ success: false, message: "Something went wrong" });
      }
      const { message, fileName } = responseFromUpload;
      const createNavbar = await Services.create({
        serviceImageName: fileName,
        serviceName: name.toLowerCase(),
        serviceDescription: serviceDescription,
        priority: priority,
      });
      await createNavbar.save();

      return baseResponse(res, true, message, createNavbar);
    } catch (error) {
      return res
        .status(400)
        .send({ success: false, message: "Something went wrong" });
    }
  },
  serviceUpdate: async (req: any, res: Response) => {
    const id = req.body.id;
    const name = req.body.serviceName;
    const image = req?.files?.image;

    let serviceDescription = req.body.serviceDescription;
    try {
      const checkServiceNameIsExist = await Services.findOne({
        where: {
          id,
          isDeleted: false,
        },
      });
      let serviceName: any;
      if (!name) {
        serviceName = checkServiceNameIsExist?.serviceName;
      }
      if (!serviceDescription) {
        serviceDescription = checkServiceNameIsExist?.serviceDescription;
      }
      if (!checkServiceNameIsExist) {
        return res
          .status(400)
          .send({ success: false, message: "Data is not found" });
      }
      let responseFromUpload;
      if (image) {
        responseFromUpload = await upload(image);
      }
      let fileName;
      let serviceImage;
      if (!responseFromUpload) {
        serviceImage = checkServiceNameIsExist?.serviceImageName;
      } else {
        fileName = responseFromUpload?.fileName;
      }
      let priority = req.body.priority;
      if (priority === "false") {
        priority = false;
      } else if (priority === "true") {
        priority = true;
      }
      const createNavbar = await Services.update(
        { id: id },
        {
          serviceImageName: fileName ? fileName : serviceImage,
          serviceName: name ? name.toLowerCase() : serviceName.toLowerCase(),
          serviceDescription: serviceDescription,
          priority: priority ? priority : req.body.priority,
        }
      );

      return baseResponse(res, true, "Succesfully uploaded", createNavbar);
    } catch (error) {
      return res
        .status(400)
        .send({ success: false, message: "Something went wrong" });
    }
  },
  servicePageUpload: async (req: any, res: Response) => {
    const image = req?.files?.serviceBanner;
    const serviceDescription = req.body.serviceDescription;
    try {
      const responseFromUpload = await upload(image);
      if (!responseFromUpload) {
        return res
          .status(402)
          .send({ success: false, message: "Something went wrong" });
      }
      const { message, fileName } = responseFromUpload;
      const createServicePageDescriptionDetails =
        await ServicePageDetails.create({
          serviceBanner: fileName,
          serviceDescription: serviceDescription,
        });
      await createServicePageDescriptionDetails.save();

      return baseResponse(
        res,
        true,
        message,
        createServicePageDescriptionDetails
      );
    } catch (error) {
      return res
        .status(400)
        .send({ success: false, message: "Something went wrong" });
    }
  },
  servicePageUpdate: async (req: any, res: Response) => {
    const id = req.body.id;
    const image = req?.files?.serviceBanner;
    let serviceDescription = req.body.serviceDescription;
    try {
      const checkServiceNameIsExist = await ServicePageDetails.findOne({
        where: {
          id,
          isDeleted: false,
        },
      });
      if (!serviceDescription) {
        serviceDescription = checkServiceNameIsExist?.serviceDescription;
      }
      let responseFromUpload;
      if (image) {
        responseFromUpload = await upload(image);
      }
      let fileName;
      let serviceImage;
      if (!responseFromUpload) {
        serviceImage = checkServiceNameIsExist?.serviceBanner;
      } else {
        fileName = responseFromUpload?.fileName;
      }
      const updatedServicePageDeatails = await ServicePageDetails.update(
        { id: id },
        {
          serviceBanner: fileName ? fileName : serviceImage,
          serviceDescription: serviceDescription,
        }
      );

      return baseResponse(
        res,
        true,
        "Succesfully uploaded",
        updatedServicePageDeatails
      );
    } catch (error) {
      return res
        .status(400)
        .send({ success: false, message: "Something went wrong" });
    }
  },
};

const upload = async (image: any): Promise<UploadResult> => {
  return new Promise<UploadResult>((resolve, reject) => {
    if (!image) {
      reject("No file provided");
    }
    const randomName = generateRandomAlphabetString(12);
    const fileExtension = path.extname(image?.name);
    const filePath = `src/public/upload/${randomName}${fileExtension}`;

    image.mv(filePath, (err: any) => {
      if (err) {
        reject("File upload failed");
      } else {
        resolve({
          message: fileUploaded,
          fileName: randomName + fileExtension,
        });
      }
    });
  });
};
