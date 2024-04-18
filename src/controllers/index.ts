import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createAccountService } from "../services/createAccountService";
import { addPeopleToAccountService } from "../services/addPeopleToAccountService";
import { printBillService } from "../services/printBillService";

const app = express();

app.use(cors());

const jsonParser = bodyParser.json();

app.post("/water-accounts", jsonParser, createAccountService());

app.put("/water-accounts/:accountID", jsonParser, addPeopleToAccountService());

app.get("/water-accounts/:accountID/bill", jsonParser, printBillService());

app.listen(81, function () {
  console.log("CORS-enabled web server listening on port 81");
});
