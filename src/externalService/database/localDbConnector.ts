import { environmentVariables } from "../../configuration/environmentVariables";

class LocalDbConnector {
  public getUrl() {
    return {
      client: "pg",
      connection: environmentVariables.DB_URL
    };
  }
}

const localDbConnector = new LocalDbConnector();
export default localDbConnector;
