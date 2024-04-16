import { accounts } from "./accounts";

export function addPeopleToAccount(): any {
  return function (req: any, res: any) {
    for (let account of accounts) {
      if (account.getId() === req.params.accountID) {
        account.addPeople(Number(req.body.peopleToAdd));
        res.json({
          response:
            "PUT request to homepage, number of people in this account is: " +
            account.getAdditionalPeople(),
        });
      }
    }
  };
}
