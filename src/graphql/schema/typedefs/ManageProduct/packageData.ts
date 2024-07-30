export const packages = `
type package {
    id: String
    service: String
    items:JSON
    basic:Boolean
    deluxe:Boolean
    superDeluxe:Boolean
    isDeleted: Boolean
    basicPackagePrice:Int
    deluxePackagePrice:Int
    superDeluxePackagePrice:Int
}
type packageData{
      packages_id:String
packages_service: String
packages_items: JSON
packages_basic: Boolean
packages_deluxe: Boolean
packages_superDeluxe:Boolean
packages_isDeleted: Boolean
packages_basicPackagePrice:Int
packages_deluxePackagePrice:Int
packages_superDeluxePackagePrice:Int
services_id: String
services_serviceName: String
services_altName: String
services_serviceDescription: String
services_serviceImage: String
services_isDeleted: Boolean
services_priority: Boolean
}

type allPackage{
    id: String
itemName: String
basicQuantity: Int
deluxeQuantity:Int
superDeluxeQuantity: Int
isDeleted: Boolean
basicPackagePrice:Int
deluxePackagePrice:Int
superDeluxePackagePrice:Int
}

type packagePriceData {
    id: String
    service: String
    superDeluxePackagePrice: String
    deluxePackagePrice: String
    basicPackagePrice: String
}
`;
