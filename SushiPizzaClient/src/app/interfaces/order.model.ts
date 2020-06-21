export interface Order {
    id?: number;
    userId?: number;
    customerPhoneNumber: string;
    productsIds: number[];
    address: string;
    totalPrice: number;
}
