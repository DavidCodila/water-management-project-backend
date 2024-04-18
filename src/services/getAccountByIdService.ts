import { account } from "../models/account";
import { accounts } from "../models/accounts";

export function getAccountByIdService(requiredId: string): account | null {
  for (let account of accounts) {
    if (account.getId() === requiredId) {
      return account;
    }
  }
  return null;
}
