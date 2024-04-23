"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canNotFindAccountIdError = void 0;
function canNotFindAccountIdError(res, id) {
    res.status(500);
    res.send({ error: "Could not find id: " + id });
}
exports.canNotFindAccountIdError = canNotFindAccountIdError;
