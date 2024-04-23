"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var body_parser_1 = require("body-parser");
var createAccountService_1 = require("../services/createAccountService");
var addPeopleToAccountService_1 = require("../services/addPeopleToAccountService");
var printBillService_1 = require("../services/printBillService");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
var jsonParser = body_parser_1.default.json();
app.post("/water-accounts", jsonParser, (0, createAccountService_1.createAccountService)());
app.put("/water-accounts/:accountID", jsonParser, (0, addPeopleToAccountService_1.addPeopleToAccountService)());
app.get("/water-accounts/:accountID/bill", jsonParser, (0, printBillService_1.printBillService)());
app.listen(81, function () {
    console.log("CORS-enabled web server listening on port 81");
});
