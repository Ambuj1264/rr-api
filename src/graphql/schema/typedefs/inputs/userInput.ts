export const userInput = `
  input CreateUserInput {
    email: String!
    password: String
    mobileNumber: String
    isDeleted:Boolean
    firstName: String
    lastName: String
  }
  
  input LoginResetInput {
    email: String!
  }
  `;