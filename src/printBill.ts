import { round } from "lodash";
import { Account } from "./Account";
import { getAccountById } from "./getAccountById";

const CORPORATION_WATER_RATE = 1;
const BOREWELL_WATER_RATE = 1.5;
export const PERSONAL_WATER_ALLOWANCE = 10;
export const DAYS_IN_A_MONTH = 30;

export function printBill(): any {
  return function (req: any, res: any) {
    const account = getAccountById(req.params.accountID);
    //api is called twice on the front end to re-render the page, so second call
    // is ignored so that account values are not double the value they should be
    if (account.getWaterAmount() !== 0 || account === ({} as Account)) {
      return;
    }

    const initalWaterRequired = calculateInitalWaterRequired(account);
    account.addWater(initalWaterRequired);

    const initalWaterRequiredPrice = calculateInitalWaterPrice(account);
    account.addCost(initalWaterRequiredPrice);

    const additionalWaterRequired = account.calculateAdditionalWaterRequired();
    account.addWater(additionalWaterRequired);

    const additionalWaterRequiredPrice = calculateAdditionalWaterRequiredPrice(
      additionalWaterRequired
    );
    account.addCost(additionalWaterRequiredPrice);

    res.json({
      waterUsage: account.getWaterAmount(),
      cost: account.getCost(),
    });
  };
}

function calculateInitalWaterRequired(account: Account) {
  return round(
    account.getInitalPeople() * PERSONAL_WATER_ALLOWANCE * DAYS_IN_A_MONTH
  );
}

function calculateInitalWaterPrice(account: Account) {
  const waterPricePerLiter = calculateWaterPricePerLitre(account);
  return waterPricePerLiter * account.getWaterAmount();
}

function calculateWaterPricePerLitre(account: Account): number {
  let corporationContribution =
    account.getCorporationRatio() * CORPORATION_WATER_RATE;
  let borewellContribution = account.getBorewellRatio() * BOREWELL_WATER_RATE;
  let ratioAccumulation =
    account.getCorporationRatio() + account.getBorewellRatio();
  return (corporationContribution + borewellContribution) / ratioAccumulation;
}

function calculateAdditionalWaterRequiredPrice(water: number) {
  let cost = 0;
  if (water < 501) {
    cost = 2 * water;
  } else if (501 < water && water < 1501) {
    cost = 1000 + (water - 500) * 3;
  } else if (1501 < water && water < 3001) {
    cost = 4000 + (water - 1500) * 5;
  } else {
    cost = 11500 + (water - 3000) * 8;
  }
  return cost;
}
