export const user = `
type User {
    id:String
    email: String
    mobileNumber: String
    isDeleted: Boolean
    firstName: String
    lastName: String
}

type UserLogin{
    id:String
    email: String 
    userId: String
    isDeleted: Boolean
    isActive: Boolean
    firstName: String
    lastName: String
}

type VerifyTokenResponse{
    oid: String
    loginId: String
    email: String
    iat: String
    exp: String
}
type updatePasswordResponse{
    affected: Int 
}
`;
