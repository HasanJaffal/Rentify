export interface ListingDto {
    id: number;
    title: string;
    price: number;
    bedroomsNumber: number;
    location: string;
    description: string;
    typeId: number;
    propertyTypeName: string;
    posterId: number;
    posterName: string;
    creationDate: string;  // Use string for dates, or Date if you need to manipulate the date object in TypeScript
}