import { round } from "lodash";
import { accounts } from "./accounts";

const CORPORATION_WATER_RATE = 1;
const BOREWELL_WATER_RATE = 1.5;
const PERSONAL_WATER_ALLOWANCE = 10;
const DAYS_IN_A_MONTH = 30;

export function printBill(): any {
  return function (req: any, res: any) {
    for (let account of accounts) {
      if (account.getId() === req.params.accountID) {
        let corporationContribution =
          Number(account.getCorporationRatio()) * CORPORATION_WATER_RATE;
        let borewellContribution =
          Number(account.getBorewellRatio()) * BOREWELL_WATER_RATE;
        let ratioAccumulation =
          Number(account.getCorporationRatio()) +
          Number(account.getBorewellRatio());
        let waterPricePerLiter =
          (corporationContribution + borewellContribution) / ratioAccumulation;
        let initalWater = round(
          account.getInitalPeople() * PERSONAL_WATER_ALLOWANCE * DAYS_IN_A_MONTH
        );
        let initalWaterPrice = round(initalWater * waterPricePerLiter);
        let bill = calculateBill(
          initalWater,
          initalWaterPrice,
          account.getAdditionalPeople()
        );
        res.json({ waterUsage: bill[0], cost: bill[1] });
      }
    }
  };
}

function determineTankerCost(water: number) {
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

function calculateBill(
  initialWater: number,
  initialWaterPrice: number,
  peopleAdded: number
): [number, number] {
  // Calculation of additional water required and associated cost
  const additionalWaterRequired = round(
    peopleAdded * PERSONAL_WATER_ALLOWANCE * DAYS_IN_A_MONTH
  );
  const additionalWaterRequiredPrice = determineTankerCost(
    additionalWaterRequired
  );

  // Calculation of total water required and associated cost
  const totalWater = initialWater + additionalWaterRequired;
  const totalWaterPrice = initialWaterPrice + additionalWaterRequiredPrice;

  return [totalWater, totalWaterPrice];
}
