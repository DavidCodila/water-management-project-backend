import { account } from "../models/account";
import { getAccountByIdService } from "./getAccountByIdService";

export function addPeopleToAccountService(): any {
  return function (req: any, res: any) {
    const account = getAccountByIdService(req.params.accountID);
    if (account === ({} as account)) {
      //TODO - add error code
      return;
    }
    account.addPeople(Number(req.body.peopleToAdd));
    res.json({
      response:
        "The number of additional people in this account is: " +
        account.getAdditionalPeople(),
    });
  };
}
