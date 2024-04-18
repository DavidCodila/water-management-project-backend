import { account } from "../models/account";
import { canNotFindAccountIdError } from "./canNotFindAccountIdError";
import { getAccountByIdService } from "./getAccountByIdService";

export function printBillService(): any {
  return function (req: any, res: any) {
    const requiredAccountId = req.params.accountID;
    const account = getAccountByIdService(requiredAccountId);
    if (account === null) {
      canNotFindAccountIdError(res, requiredAccountId);
      return;
    } else if (pageRerender(account)) return; //api is called twice on the front end to re-render the page

    account.setTotalWaterAmount();
    account.setTotalCost();

    res.json({
      waterUsage: account.getWaterUsage(),
      cost: account.getCost(),
    });
  };
}

function pageRerender(account: account): boolean {
  if (account.getWaterUsage() !== 0) {
    return true;
  }
  return false;
}
