"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountByIdService = void 0;
var accounts_1 = require("../models/accounts");
function getAccountByIdService(requiredId) {
    for (var _i = 0, accounts_2 = accounts_1.accounts; _i < accounts_2.length; _i++) {
        var account_1 = accounts_2[_i];
        if (account_1.getId() === requiredId) {
            return account_1;
        }
    }
    return null;
}
exports.getAccountByIdService = getAccountByIdService;
