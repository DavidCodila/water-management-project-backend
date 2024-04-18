import { Account } from "./Account";
import { accounts } from "./accounts";

export function getAccountById(requiredId: string): Account {
  for (let account of accounts) {
    if (account.getId() === requiredId) {
      return account;
    }
  }
  return {} as Account;
}
