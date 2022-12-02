import bodyParser from "body-parser";
import express from "express";
import { environmentVariables } from "./configuration/environmentVariables";
import { TableInitializer } from "./externalService/database/tables/intialization";
import messageQ from "./externalService/messageBroker/messageQ";
import { communityRoutes } from "./routes/communityRoutes";

const port = environmentVariables.PORT;
const app = express();

function checkErrors(err: any, req: any, res: any, next: any) {
  if (err instanceof SyntaxError && err.message.indexOf("JSON")) {
    res.status(400).json({ errorCode: 100, Ref: "Error parsing JSON" });
  } else {
    res.status(400).json({ errorCode: 101, Ref: "Error parsing JSON" });
  }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(checkErrors);
app.use(communityRoutes);

async function main() {
  await TableInitializer.init()
    .then(async () => {
      console.log("Database up !!!");
      return messageQ.init();
    })
    .then(async () => {
      console.log("Broker up !!!");
      console.log("Application started on port " + port);
      app.listen(port);
    })
    .catch(async (error) => {
      console.error("Error setting up service", { error: error });
    });
}

main();
export { app };