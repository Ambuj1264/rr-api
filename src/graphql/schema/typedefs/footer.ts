export const footer = `
type footer {
    id: String
    footerLogo: String
    footerDescription: String
    isDeleted: Boolean
    socialMedia: [socialMedia]
}
type socialMedia {
    facebook: String
    twitter: String
    instagram: String
    linkedin: String
}


`;
