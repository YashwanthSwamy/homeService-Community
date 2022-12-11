import { commonValidators } from "../../shared/validators/commonValidators";
import { GetServiceProviderInfoModel } from "../model/getServiceProviderInfoModel";

export class GetServiceProvidersInfoValidator {
  input: GetServiceProviderInfoModel;

  constructor(request: GetServiceProviderInfoModel) {
    this.input = request;
  }

  validateCustomerId() {
    if (!this.input.customerId) {
      return this
    }
    if (!commonValidators.checkIsValidASCII(this.input.customerId)) {
      throw new Error("[VALIDATION] customer Id undefined/ not ASCII");
    }

    return this;
  }
}