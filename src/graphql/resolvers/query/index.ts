import { loginResolver } from "./auth";
import { clearCacheQuery } from "./clearCache";
import { HomePage } from "./homePage";
import { serviceDescriptionPage } from "./serviceDescription";
import { verifyToken } from "./tokenVerification";
import { footerData } from "./footer";
import { headerData } from "./header";
import { getUserDetailsByIdResolver } from "./users";
import {
  ServicesPage,
  FindService,
  CheckPriority,
  serviceListing,
  servicePageDataListing,
  FindServicePageDeatails,
  serviceListingOfTopFive,
} from "./services";
import { productItemsListing } from "./Product/item";
import { findProductItems } from "../../mutations/user-interface-mutation/manageProduct/item";
import {
  basicPackage,
  deluxePackage,
  packageData,
  packageSingleData,
  packagesListing,
  superDeluxePackage,
} from "./Product/packages";
import { getAllReservation } from "./reservation";
import {
  reservationFormAllData,
  reservationFormSingleData,
  reservationFormSingleDataForUI,
} from "./reservationForm";
import { allSlots, findSlot, findSlotByDate } from "./slots";
import { dashboard } from "./dashboard";
export const queryResolvers = {
  clearCache: clearCacheQuery,
  login: loginResolver,
  getUserDetailsById: getUserDetailsByIdResolver,
  verifyToken,
  HomePage,
  serviceDesciptionModule: serviceDescriptionPage,
  serviceListing,
  footerData,
  headerData,
  ServicesPage,
  FindService,
  CheckPriority,
  servicePageDataListing,
  FindServicePageDeatails,
  serviceListingOfTopFive,
  productItemsListing,
  findProductItems,
  packagesListing,
  packageSingleData,
  basicPackage,
  deluxePackage,
  superDeluxePackage,
  getAllReservation,
  packageData,
  reservationFormAllData,
  reservationFormSingleData,
  reservationFormSingleDataForUI,
  allSlots,
  findSlot,
  findSlotByDate,
  dashboard,
};
