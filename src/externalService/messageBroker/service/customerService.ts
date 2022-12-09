import { UserType } from "../../../features/serviceProvider/enum/userType";
import { createServiceProviderCommand } from "../../database/entites/CommunityServiceProviders/command/createServiceProviderCommand";
import { updateServiceProviderCommand } from "../../database/entites/CommunityServiceProviders/command/updateServiceProviderCommand";
import { CreateServiceProviderModelDAO } from "../../database/models/DAO/createServiceProviderModelDAO";
import { UpdateServiceProviderModelDAO } from "../../database/models/DAO/updateServiceProviderModelDAO";
import { CreateCustomerInfoModel } from "../models/createCustomerInfoModel";
import { UpdateCustomerInfoModel } from "../models/updateCustomerInfoModel";

export class CustomerService {
    async customerCreated(customerData: CreateCustomerInfoModel){
        if (customerData.userType === UserType.Customer){
            return;
        }
        try {
            const createData: CreateServiceProviderModelDAO= {
                CustomerID: customerData.customerId,
                Name: customerData.name,
                Email: customerData.email,
                PhoneNumber: customerData.phoneNumber,
                UserType: customerData.userType,
                OfferedService: customerData.offeredService
            }
            return await createServiceProviderCommand.execute(createData);
        } catch (error) {
            return;
        }
    }

    async customerUpdated(updatedCustomerData: UpdateCustomerInfoModel) {
        if (updatedCustomerData.userType === UserType.Customer){
            return;
        }
        try {
            const updateData: UpdateServiceProviderModelDAO= {
                Name: updatedCustomerData.name,
                Email: updatedCustomerData.email,
                PhoneNumber: updatedCustomerData.phoneNumber,
                UserType: updatedCustomerData.userType,
                OfferedService: updatedCustomerData.offeredService
            }
            const updateFor: UpdateWhereClauseModel = {
                CustomerID: updatedCustomerData.customerId
            }
            return await updateServiceProviderCommand.execute(updateFor, updateData);
        } catch (error) {
            return;
        }
    }
}

const customerService = new CustomerService();
export { customerService }