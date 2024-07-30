export const homePage = `
type HomePage{
  footer : footer
  header : header
  serviceDescription: ServiceDescriptionDetails
  services: [ServiceList]
}
type header {
  id: String
  imageName: String
}
type headerDeatails{
  id: String
  imageName: String
  altName: String
  isDeleted: Boolean
}
`;
