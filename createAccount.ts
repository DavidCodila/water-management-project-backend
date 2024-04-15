import { random } from "lodash";
import { accounts } from "./accounts";

export function createAccount(): any {
  return function (req: any, res: any) {
    var userRequestJson = req.body;
    const newAccount = {
      id: String(random(1, 99999)),
      appartmentType: userRequestJson.appartmentType,
      corporationRatio: userRequestJson.corporationRatio,
      borewellRatio: userRequestJson.borewellRatio,
      people: 0,
    };
    accounts.push(newAccount);
    console.log("Created new account: " + newAccount.id + "\n");
    //resetting for new user
    res.json({ accountId: newAccount.id });
  };
}
