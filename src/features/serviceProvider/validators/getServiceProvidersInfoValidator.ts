import { commonValidators } from "../../shared/validators/commonValidators";
import { GetServiceProviderInfoModel } from "../model/getServiceProviderInfoModel";

export class GetServiceProvidersInfoValidator {
    input: GetServiceProviderInfoModel;

    constructor(request: GetServiceProviderInfoModel) {
        this.input = request;
    }

    validateClientId() {
        if (!commonValidators.checkIsValidASCII(this.input.userId)) {
          throw new Error("[VALIDATION] userId undefined/ not ASCII");
        }
    
        return this;
      }
}