import { getServiceProviderInfoQuery } from "../../../externalService/database/entites/CommunityServiceProviders/queries/getServiceProviderInfoQuery";
import { Operation } from "../../../externalService/database/enums/dbOperations";
import { getStatusCode } from "../../shared/service/getStatusCode";

class GetServiceProviderInfoService {
    async get(customerId: string) {
        try {
            const result = await getServiceProviderInfoQuery.execute(customerId);
            return {
                data: result,
                status: getStatusCode.operationToStatusCode(Operation.Success)
            };
        } catch (operation: any) {
            return {
                data: undefined,
                status: getStatusCode.operationToStatusCode(operation)
            };
        }
    }
}

const getServiceProviderInfoService = new GetServiceProviderInfoService();
export { getServiceProviderInfoService }