export const footerInput = `
  input CreateFooterInput {
  footerLogo: String
  footerDescription: String
  facebook: String
  twitter: String
  instagram: String
  linkedin: String
  }
  input editFooterInput {
    id: String
    footerLogo: String
    footerDescription: String
    isDeleted: Boolean
    facebook: String
    instagram: String
    linkedin : String
    twitter: String
}
  `;
