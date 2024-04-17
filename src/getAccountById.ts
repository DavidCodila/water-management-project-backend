import { Account } from "./Account";
import { accounts } from "./accounts";
import { errorAccount } from "./errorAccount";

export function getAccountById(requiredId: string): Account {
  for (let account of accounts) {
    if (account.getId() === requiredId) {
      return account;
    }
  }
  return errorAccount;
}
