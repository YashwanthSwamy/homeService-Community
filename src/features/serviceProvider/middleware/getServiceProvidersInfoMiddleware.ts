import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { GetServiceProviderInfoModel } from "../model/getServiceProviderInfoModel";
import { GetServiceProvidersInfoValidator } from "../validators/getServiceProvidersInfoValidator";

class GetServiceProvidersInfoMiddleware{
    
    public validateRequest(request: Request, response: Response, next: NextFunction) {
        const input: GetServiceProviderInfoModel = {
            customerId: request.params.customerId
        };
    
        try {
          new GetServiceProvidersInfoValidator(input)
            .validateCustomerId()
    
        } catch  (err) {
          console.log(err);
          response.status(HttpStatus.BAD_REQUEST);
          response.send(err);
          return;
        }

        next();
      }
}

const getServiceProvidersInfoMiddleware = new GetServiceProvidersInfoMiddleware();
export { getServiceProvidersInfoMiddleware };