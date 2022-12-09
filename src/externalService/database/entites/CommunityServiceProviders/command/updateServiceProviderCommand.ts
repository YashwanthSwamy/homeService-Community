import { Tables } from "../../../constants/Tables";
import db from "../../../dbConnector";
import { Operation } from "../../../enums/dbOperations";
import { UpdateServiceProviderModelDAO } from "../../../models/DAO/updateServiceProviderModelDAO";

export class UpdateServiceProviderCommand{
    async execute(selector: UpdateWhereClauseModel, updateRequest: UpdateServiceProviderModelDAO): Promise<Operation> {

        let dbResponse;
        try {
            dbResponse = await this.query(updateRequest, selector);
        } catch (error) {
            console.error("[DB] update user failed", { inputdata: updateRequest, error: error });
            throw Operation.Error;
        }

        if (dbResponse && dbResponse.length > 0) {
            return Operation.Success;
        }

        console.log("[DB] Non-existent customer", { inputData: { updateRequest, for: selector } });
        throw Operation.ObjectDoesNotExists;
    }

    private async query(
        updateRequest: UpdateServiceProviderModelDAO,
        selector: UpdateWhereClauseModel,
      ) {

        const query = db.dbConnector.update(updateRequest)
          .into(Tables.TABLE_CUSTOMERS)
          .where(selector)
          .returning("*");

        return query.then((response: any) => response);
      }
}

const updateServiceProviderCommand = new UpdateServiceProviderCommand();
export { updateServiceProviderCommand };