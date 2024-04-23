"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPeopleToAccountService = void 0;
var canNotFindAccountIdError_1 = require("./canNotFindAccountIdError");
var getAccountByIdService_1 = require("./getAccountByIdService");
function addPeopleToAccountService() {
    return function (req, res) {
        var accountId = req.params.accountID;
        var amountOfpeople = req.body.peopleToAdd;
        var account = (0, getAccountByIdService_1.getAccountByIdService)(accountId);
        if (account === null) {
            (0, canNotFindAccountIdError_1.canNotFindAccountIdError)(res, accountId);
            return;
        }
        account.addPeople(Number(amountOfpeople));
        res.json({
            response: "The number of additional people in this account is: " +
                account.getAdditionalPeople(),
        });
    };
}
exports.addPeopleToAccountService = addPeopleToAccountService;
