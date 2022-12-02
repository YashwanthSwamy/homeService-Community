import { Tables } from "../constants/Tables";
import CommunityServiceProviders from "../CommunityServiceProviders/configuration/definition";
import { createTable } from "./CreateTable";

export class TableInitializer {

  static async init() {
    await createTable.create(Tables.TABLE_CUSTOMERS, CommunityServiceProviders.definition);
  }
}
