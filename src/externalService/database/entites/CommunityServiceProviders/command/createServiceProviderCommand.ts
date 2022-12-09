import { Tables } from "../../../constants/Tables";
import db from "../../../dbConnector";
import { Operation } from "../../../enums/dbOperations";
import { CreateServiceProviderModelDAO } from "../../../models/DAO/createServiceProviderModelDAO";

export class CreateServiceProviderCommand{
    async execute(serviceProviderData: CreateServiceProviderModelDAO): Promise<Operation> {
        let dbResponse;
        try {
            dbResponse = await db.dbConnector
            .insert(serviceProviderData)
            .into(Tables.TABLE_CUSTOMERS)
            .then((response: any) => response);

            if (dbResponse && dbResponse.length > 0) {
                return Operation.Success;
            }
            console.log(`[DB] Already exist`, { inputData: serviceProviderData });
            return Operation.AlreadyExists;
    
        } catch (error) {
          console.error("[DB] create service provider failed", { inputdata: serviceProviderData, error });
          throw Operation.Error;
        }
      }
}

const createServiceProviderCommand = new CreateServiceProviderCommand();
export { createServiceProviderCommand }