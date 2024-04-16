import { accounts } from "./accounts";
import { Account } from "./Account";

export function createAccount(): any {
  return function (req: any, res: any) {
    const newAccount = new Account(
      req.body.appartmentType,
      req.body.corporationRatio,
      req.body.borewellRatio
    );
    accounts.push(newAccount);
    res.json({ accountId: newAccount.getId() });
  };
}
