import express from "express";
const route = express.Router();
import { imageUploaderController } from "../controller/image-uploader/index";

route.post("/navbarUpload", imageUploaderController.navbarUpload);
route.post("/serviceUpload", imageUploaderController.serviceUpload);
route.post("/servicePageUpload", imageUploaderController.servicePageUpload);
route.post("/servicePageUpdate", imageUploaderController.servicePageUpdate);
route.post("/serviceUpdate", imageUploaderController.serviceUpdate);
route.get("/", imageUploaderController.start);
export default route;
