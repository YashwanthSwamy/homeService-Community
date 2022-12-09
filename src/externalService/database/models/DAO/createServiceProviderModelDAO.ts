export interface CreateServiceProviderModelDAO {
    CustomerID: string;
    Name: string;
    Email: string;
    PhoneNumber: string;
    UserType: string;
    OfferedService: string| null;
}