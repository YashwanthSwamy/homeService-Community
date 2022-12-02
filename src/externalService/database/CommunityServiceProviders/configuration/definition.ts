import Knex from "knex";

export default class CommunityServiceProviders {

  static definition(table: Knex.CreateTableBuilder) {
    table.string("UserID").notNullable();
    table.primary(["UserID"]);
    table.string("Name").notNullable();
    table.string("Email").notNullable();
    table.integer("PhoneNumber").notNullable();
    table.string("UserType").nullable();
    table.string("ServiceProvided").nullable();
  }

}
