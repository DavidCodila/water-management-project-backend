import { account } from "../models/account";
import { getAccountByIdService } from "./getAccountByIdService";

export function addPeopleToAccountService(): any {
  return function (req: any, res: any) {
    const account = getAccountByIdService(req.params.accountID);
    if (account === null) {
      //res.status(500);
      res.status(500);
      res.send({ error: "Could not find id: " + req.params.accountID });
    } else {
      account.addPeople(Number(req.body.peopleToAdd));
      res.json({
        response:
          "The number of additional people in this account is: " +
          account.getAdditionalPeople(),
      });
    }
  };
}
