export interface IServiceProviderDBModel {
    CustomerId: string;
    Name: string;
    Email: string;
    PhoneNumber: string;
    UserType: string;
    OfferedService: string| null;
}


export default class ServiceProviderModelDTO {
    customerId: string;
    name: string;
    email: string;
    phoneNumber: string;
    userType: string;
    offeredService: string | null;
  
    constructor(customer: IServiceProviderDBModel) {
        this.customerId = customer.CustomerId;
        this.name = customer.Name;
        this.email = customer.Email;
        this.phoneNumber = customer.PhoneNumber;
        this.userType = customer.UserType;
        this.offeredService = customer.OfferedService;
    }
  }