import { round } from "lodash";
import { accounts } from "./accounts";
import { Account } from "./Account";

const CORPORATION_WATER_RATE = 1;
const BOREWELL_WATER_RATE = 1.5;
const PERSONAL_WATER_ALLOWANCE = 10;
const DAYS_IN_A_MONTH = 30;

export function printBill(): any {
  return function (req: any, res: any) {
    for (let account of accounts) {
      if (account.getId() === req.params.accountID) {
        //api is called twice on the front end to re-render the page, so senond call
        // is ignored so that account values are not double the value they should be
        if (account.getWaterAmount() !== 0) {
          return;
        }

        const initalWaterRequired = calculateInitalWaterRequired(account);
        account.addWater(initalWaterRequired);

        const initalWaterRequiredPrice = calculateInitalWaterPrice(account);
        account.addCost(initalWaterRequiredPrice);

        const additionalWaterRequired =
          calculateAdditionalWaterRequired(account);
        account.addWater(additionalWaterRequired);

        const additionalWaterRequiredPrice = calculateTankerCost(
          additionalWaterRequired
        );
        account.addCost(additionalWaterRequiredPrice);

        res.json({
          waterUsage: account.getWaterAmount(),
          cost: account.getCost(),
        });
      }
    }
  };
}

function calculateAdditionalWaterRequired(account: Account) {
  return round(
    account.getAdditionalPeople() * PERSONAL_WATER_ALLOWANCE * DAYS_IN_A_MONTH
  );
}

function calculateInitalWaterRequired(account: Account) {
  return round(
    account.getInitalPeople() * PERSONAL_WATER_ALLOWANCE * DAYS_IN_A_MONTH
  );
}

function calculateInitalWaterPrice(account: Account) {
  let corporationContribution =
    account.getCorporationRatio() * CORPORATION_WATER_RATE;
  let borewellContribution = account.getBorewellRatio() * BOREWELL_WATER_RATE;
  let ratioAccumulation =
    account.getCorporationRatio() + account.getBorewellRatio();
  let waterPricePerLiter =
    (corporationContribution + borewellContribution) / ratioAccumulation;
  return waterPricePerLiter * account.getWaterAmount();
}

function calculateTankerCost(water: number) {
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
