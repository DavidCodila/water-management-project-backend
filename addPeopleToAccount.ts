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
    console.log(
      "Last account in accounts: " + accounts[accounts.length - 1].id
    );
    console.log("Returned account ID: " + req.params.accountID + "\n");
    console.log("Indexed account people value: " + accountToAlter.id);
    accountToAlter.people += Number(req.body.peopleToAdd);
    console.log("account: " + accountToAlter.id);
    res.json({
      response:
        "PUT request to homepage, number of people in this account is: " +
        accountToAlter.people,
    });
  };
}
