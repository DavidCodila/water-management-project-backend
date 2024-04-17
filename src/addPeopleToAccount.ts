import { errorAccount } from "./errorAccount";
import { getAccountById } from "./getAccountById";

export function addPeopleToAccount(): any {
  return function (req: any, res: any) {
    const account = getAccountById(req.params.accountID);
    if (account === errorAccount) {
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
