export const reservationData = `
    type reservationData {
        reservationForm: JSON
        serviceId: String
        serviceName: String
        packages: JSON
        packagePrice: String
        packageType:String
    }

    type reservationFormData {
        id:String
        serviceName:String
        serviceId: String
        fields : JSON
    }
`;
