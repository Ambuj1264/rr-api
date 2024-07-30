export const services = `
    type ServiceDescriptionDetails{
        id: String
        serviceName: String
        serviceSubheading: String
        serviceDescription: String
        serviceButton :String
        isDeleted:Boolean
    }

    type Services{
        id: String
        serviceName: String
        altName : String
        serviceImageName : String
        serviceDescription: String
        priority: Boolean
        isDeleted: Boolean
    }
    type ServiceList{
        id: String
        serviceName: String
        altName : String
        serviceImageName : String
        serviceDescription: String
        priority: Boolean
        isDeleted: Boolean
    }
    type ServicePageData{
        id: String
        serviceBanner : String
        serviceDescription: String
        isDeleted: Boolean
    }
    type ServicesPage {
        ServiceList: [ServiceList]
    }
`;
