import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { GetServiceProviderInfoModel } from "../model/getServiceProviderInfoModel";
import { GetServiceProvidersInfoValidator } from "../validators/getServiceProvidersInfoValidator";

class GetServiceProvidersInfoMiddleware{
    
    public validateRequest(request: Request, response: Response, next: NextFunction) {
        const input: GetServiceProviderInfoModel = {
            userId: request.body.userId
        };
    
        try {
          new GetServiceProvidersInfoValidator(input)
            .validateClientId()
    
        } catch  (err) {
          console.log(err);
          response.status(HttpStatus.BAD_REQUEST);
          response.json(err);
          return;
        }

        next();
      }
}

const getServiceProvidersInfoMiddleware = new GetServiceProvidersInfoMiddleware();
export { getServiceProvidersInfoMiddleware };