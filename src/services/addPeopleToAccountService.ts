import { canNotFindAccountIdError } from "./canNotFindAccountIdError";
import { getAccountByIdService } from "./getAccountByIdService";

export function addPeopleToAccountService(): any {
  return function (req: any, res: any) {
    const accountId = req.params.accountID;
    const amountOfpeople = req.body.peopleToAdd;
    const account = getAccountByIdService(accountId);
    if (account === null) {
      canNotFindAccountIdError(res, accountId);
      return;
    }
    account.addPeople(Number(amountOfpeople));
    res.json({
      response:
        "The number of additional people in this account is: " +
        account.getAdditionalPeople(),
    });
  };
}
