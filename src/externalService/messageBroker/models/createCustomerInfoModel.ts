export interface CreateCustomerInfoModel {
    customerId: string;
    name: string;
    email: string;
    phoneNumber: string;
    houseNumber: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    password: string;
    userType: string;
    offeredService: string | null;
}