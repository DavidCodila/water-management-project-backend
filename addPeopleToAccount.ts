import { accounts } from "./accounts";
import { initaliserAccount } from "./initaliserAccount";

export function addPeopleToAccount(): any {
  return function (req: any, res: any) {
    var accountToAlter = initaliserAccount;
    for (var i = 0; i < accounts.length; i++) {
      if (accounts[i].id === req.params.accountID) {
        accountToAlter = accounts[i];
      }
    }
    if (accountToAlter === initaliserAccount) {
      console.log("Error with finding id");
      return;
    }
    accountToAlter.people += Number(req.body.peopleToAdd);
    res.json({
      response:
        "PUT request to homepage, number of people in this account is: " +
        accountToAlter.people,
    });
  };
}
