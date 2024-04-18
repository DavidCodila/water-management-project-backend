import { accounts } from "./accounts";
import { account } from "./account";

export function createAccount(): any {
  return function (req: any, res: any) {
    const newAccount = new account(
      req.body.appartmentType,
      Number(req.body.corporationRatio),
      Number(req.body.borewellRatio)
    );
    accounts.push(newAccount);
    res.json({ accountId: newAccount.getId() });
  };
}
