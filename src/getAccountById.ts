import { account } from "./account";
import { accounts } from "./accounts";

export function getAccountById(requiredId: string): account {
  for (let account of accounts) {
    if (account.getId() === requiredId) {
      return account;
    }
  }
  return {} as account;
}
