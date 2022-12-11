import e from "express";
import { Tables } from "../../../constants/Tables";
import db from "../../../dbConnector";
import { Operation } from "../../../enums/dbOperations";
import ServiceProviderModelDTO from "../../../models/DTO/serviceProviderModelDTO";

type SelectorModel = { CustomerID: string; };

export class GetServiceProviderInfoQuery {
    async execute(customerId?: string): Promise<ServiceProviderModelDTO> {

        let dbResponse;
        try {
            if(customerId){
                const selector: SelectorModel = { CustomerID: customerId }
                dbResponse = await this.query(selector);
            } else {
                dbResponse = await this.query();
            }
        } catch (error) {
            console.error("[DB] fetch user failed", { inputdata: { customerId: customerId }, error: error });
            throw Operation.Error;
        }

        if (dbResponse && dbResponse.length > 0) {
            const result: any = []
            dbResponse.forEach((element: any) => {
                result.push(new ServiceProviderModelDTO(element))
            });
            return result;
        }
        console.log("[DB] Non-existent customer", { customerId: customerId });
        throw Operation.AlreadyExists;
    }

    private query(selector?: SelectorModel) {
        let query;
        if (selector) {
            query = db.dbConnector
                .from(Tables.TABLE_CUSTOMERS)
                .where(selector);
        } else {
            query = db.dbConnector
                .from(Tables.TABLE_CUSTOMERS)
        }
        return query.then((response: any) => response);
    }
}

const getServiceProviderInfoQuery = new GetServiceProviderInfoQuery();
export { getServiceProviderInfoQuery };