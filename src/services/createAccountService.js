"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccountService = void 0;
var accounts_1 = require("../models/accounts");
var account_1 = require("../models/account");
function createAccountService() {
    return function (req, res) {
        var newAccount = new account_1.account(req.body.appartmentType, Number(req.body.corporationRatio), Number(req.body.borewellRatio));
        saveAccountToMemory(newAccount);
        res.json({ accountId: newAccount.getId() });
    };
}
exports.createAccountService = createAccountService;
function saveAccountToMemory(account) {
    accounts_1.accounts.push(account);
}
