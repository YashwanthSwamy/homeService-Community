import Knex from "knex";

export default class CommunityServiceProviders {

  static definition(table: Knex.CreateTableBuilder) {
    table.string("CustomerID").notNullable();
    table.primary(["CustomerID"]);
    table.string("Name").notNullable();
    table.string("Email").notNullable();
    table.integer("PhoneNumber").notNullable();
    table.string("UserType").nullable();
    table.string("OfferedService").nullable();
  }
}
