export const reservationFormInput = `
input reservationFormInput {
   serviceId: String
   serviceName: String
   fields: JSON
}

`;

export const updateReservation = `
input updateReservationInput {
   id: String
   serviceId: String
   serviceName: String
   fields: JSON
}
`;
