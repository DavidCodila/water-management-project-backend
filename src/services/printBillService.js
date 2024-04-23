"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printBillService = void 0;
var canNotFindAccountIdError_1 = require("./canNotFindAccountIdError");
var getAccountByIdService_1 = require("./getAccountByIdService");
function printBillService() {
    return function (req, res) {
        var requiredAccountId = req.params.accountID;
        var account = (0, getAccountByIdService_1.getAccountByIdService)(requiredAccountId);
        if (account === null) {
            (0, canNotFindAccountIdError_1.canNotFindAccountIdError)(res, requiredAccountId);
            return;
        }
        else if (pageRerender(account))
            return; //api is called twice on the front end to re-render the page
        account.setTotalWaterAmount();
        account.setTotalCost();
        res.json({
            waterUsage: account.getWaterUsage(),
            cost: account.getCost(),
        });
    };
}
exports.printBillService = printBillService;
function pageRerender(account) {
    if (account.getWaterUsage() !== 0) {
        return true;
    }
    return false;
}
