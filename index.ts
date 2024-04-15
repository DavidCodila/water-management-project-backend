var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
import { createAccount } from "./createAccount";
import { addPeopleToAccount } from "./addPeopleToAccount";
import { printBill } from "./printBill";

app.use(cors());

var jsonParser = bodyParser.json();

app.post("/water-accounts", jsonParser, createAccount());

app.put("/water-accounts/:accountID", jsonParser, addPeopleToAccount());

app.get("/water-accounts/:accountID/bill", jsonParser, printBill());

app.listen(81, function () {
  console.log("CORS-enabled web server listening on port 81");
});
