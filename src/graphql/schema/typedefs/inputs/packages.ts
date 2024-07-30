export const PackageInputTypes = `
input PackageInput{
    service: String
    items:JSON
    basic:Boolean
    deluxe:Boolean
    superDeluxe:Boolean
    basicPackagePrice:Int
    deluxePackagePrice:Int
    superDeluxePackagePrice:Int
}
input editPackageInput {
    id: String
    service: String
    items:JSON
    basic:Boolean
    deluxe:Boolean
    superDeluxe:Boolean
    basicPackagePrice:Int
    deluxePackagePrice:Int
    superDeluxePackagePrice:Int
    isDeleted: Boolean
}
`;