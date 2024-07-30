import { createUserMutation } from "./user/create";
import { loginReset, changePassword } from "./user/login";
import {
  createFooterMutation,
  deleteFooter,
  editFooter,
} from "./user-interface-mutation/footer";
import {
  createServiceDescriptionDetails,
  deleteServiceDescrition,
} from "./user-interface-mutation/service-description";
import {
  bulkServicesDelete,
  deleteServices,
  deleteServicesPageDescription,
  updateServicePriority,
} from "./user-interface-mutation/service";
import { deleteHeader } from "./user-interface-mutation/header";
import {
  bulkProductItemDelete,
  createProductItem,
  deleteProductItem,
  updateProductItems,
} from "./user-interface-mutation/manageProduct/item";
import {
  bulkPakagesDelete,
  createPackage,
  deletePackage,
  updatePackage,
} from "./user-interface-mutation/manageProduct/packages";
import { createReservation } from "./user-interface-mutation/reservation";
import {
  bulkDelteReservationForm,
  createRerservationForm,
  deleteReservationForm,
  updateReservationForm,
} from "./user-interface-mutation/ReservationForm";
import {
  bulkDeleteSlots,
  createSlot,
  deleteSlot,
  updateSlot,
} from "./user-interface-mutation/slot";

export const mutationResolvers = {
  createUser: createUserMutation,
  loginReset,
  changePassword,
  createFooterMutation,
  createServiceDescriptionDetails,
  deleteServices,
  deleteHeader,
  deleteFooter,
  editFooter,
  deleteServiceDescrition,
  bulkServicesDelete,
  updateServicePriority,
  deleteServicesPageDescription,
  createProductItem,
  deleteProductItem,
  bulkProductItemDelete,
  updateProductItems,
  createPackage,
  deletePackage,
  bulkPakagesDelete,
  updatePackage,
  createReservation,
  createRerservationForm,
  deleteReservationForm,
  bulkDelteReservationForm,
  updateReservationForm,
  createSlot,
  deleteSlot,
  bulkDeleteSlots,
  updateSlot,
};
