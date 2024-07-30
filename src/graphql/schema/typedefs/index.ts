import { auth } from "./auth";
import { connections } from "./connection/connections";
import { inputTypes } from "./inputs";
import { root } from "./root";
import { user } from "./user";
import { footer } from "./footer";
import { homePage } from "./header";
import { services } from "./services";
import { Item } from "./ManageProduct/itemData";
import { packages } from "./ManageProduct/packageData";
import { reservationData } from "./reservation";
import { slotResponse } from "./slot";
import { dashboard } from "./dashboard";
export const typeDefs = [
  ...inputTypes,
  root,
  user,
  auth,
  connections,
  footer,
  homePage,
  services,
  Item,
  packages,
  reservationData,
  slotResponse,
  dashboard,
];
