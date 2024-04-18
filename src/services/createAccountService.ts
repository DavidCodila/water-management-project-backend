import { accounts } from "../models/accounts";
import { account } from "../models/account";

export function createAccountService(): any {
  return function (req: any, res: any) {
    const newAccount = new account(
      req.body.appartmentType,
      Number(req.body.corporationRatio),
      Number(req.body.borewellRatio)
    );
    saveAccountToMemory(newAccount);
    res.json({ accountId: newAccount.getId() });
  };
}

function saveAccountToMemory(account: account) {
  accounts.push(account);
}
