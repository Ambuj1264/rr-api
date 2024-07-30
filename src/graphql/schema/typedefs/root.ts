export const root = `
  # Query Definitions
  type Query {
    getUserDetailsById(id: String!): User
    clearCache(entries: [CacheEntry]!): String
    login(email: String!, password: String!): LoginWithToken
    users(first: Int, after: Int): UserConnection!
    verifyToken(token: String!): VerifyTokenResponse
    HomePage: HomePage
    serviceDesciptionModule:ServiceDescriptionDetails
    serviceListing: [ServiceList]
    serviceListingOfTopFive: [ServiceList]
    servicePageDataListing:[ServicePageData]
    productItemsListing:[productItemData]
    findProductItems(id: String!):productItemData
    footerData: footer
    headerData:headerDeatails
    ServicesPage: ServicesPage
    FindService (id: String!): Services
    FindServicePageDeatails (id: String!): ServicePageData
    CheckPriority: Int
    packagesListing: [packageData]
    packageSingleData(id: String!):packageData
    basicPackage(id: String): [allPackage]
    deluxePackage(id: String): [allPackage]
    superDeluxePackage(id: String): [allPackage]
    getAllReservation: [reservationData]
    packageData (serviceId: String): packagePriceData
    reservationFormAllData: [reservationFormData]
    reservationFormSingleData(id: String!): reservationFormData
    reservationFormSingleDataForUI(serviceId: String!):reservationFormData
    allSlots: [slotResponse]
    findSlot(id: String!): slotResponse
    findSlotByDate(startDate: String!): slotResponse
    dashboard : dashboardResponse
  }
  
  # Mutation Definitions  
  type Mutation {
   createUser(input: CreateUserInput!): User
   loginReset(input: LoginResetInput!): String
   changePassword(password: String!, email:String!): updatePasswordResponse
   createFooterMutation(input: CreateFooterInput): footer
   createServiceDescriptionDetails(input: ServiceDescription): ServiceDescriptionDetails
   createService(input: createServiceInput): Services
   deleteServices(id: String!): ServiceList
   deleteServicesPageDescription(id: String!): ServicePageData
   deleteHeader(id: String!): headerDeatails
   deleteFooter(id: String!): footer
   editFooter(input: editFooterInput): Boolean
   deleteServiceDescrition(id: String!): ServiceDescriptionDetails
   deleteProductItem(id: String!): productItemData
   bulkServicesDelete(ids: [String]):[Services]
   bulkProductItemDelete(ids: [String]):[productItemData]
   bulkPakagesDelete(ids:[String]): [package]
   updateProductItems(input: editProductItem):Boolean
   updateServicePriority(id: String, priority: Boolean): Services
   createProductItem(input: ItemDetails): productItemData
   createPackage(input: PackageInput): package
   deletePackage(id: String!): package
   updatePackage(input:editPackageInput):package
   createReservation(input: reservationInput): reservationData
   createRerservationForm(input: reservationFormInput): reservationFormData
   deleteReservationForm(id: String!): reservationFormData
   bulkDelteReservationForm(ids: [String]): [reservationFormData]
   updateReservationForm(input: updateReservationInput): reservationFormData
   createSlot(input: slotInput):slotResponse
   deleteSlot(id: String!): slotResponse
   bulkDeleteSlots(ids: [String]!): [slotResponse]
   updateSlot(input : slotUpdateInput): slotResponse
  }

  # Scalar Definitions
  scalar DateTime
  scalar JSON
  scalar Upload
`;
