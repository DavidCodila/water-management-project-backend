var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
import { round } from "lodash";
import { createAccount } from "./createAccount";

const CORPORATION_WATER_RATE = 1;
const BOREWELL_WATER_RATE = 1.5;
const PERSONAL_WATER_ALLOWANCE = 10;
const DAYS_IN_A_MONTH = 30;

var peopleToAdd: number = 0;
var billID: number = 0;

var user = {
  id: "2131241",
  appartmentType: "",
  corporationRatio: "",
  borewellRatio: "",
};

app.use(cors());

var jsonParser = bodyParser.json();

app.post("/water-accounts", jsonParser, createAccount());

app.put("/water-accounts/2131241", jsonParser, function (req: any, res: any) {
  peopleToAdd += Number(req.body.peopleToAdd);
  res.json({ response: "PUT request to homepage to add: " + peopleToAdd });
});

app.get(
  "/water-accounts/2131241/bill",
  jsonParser,
  function (req: any, res: any) {
    billID = req.body.userID;
    let people = appartmentCheck(user.appartmentType);
    let corporationWaterRatio = user.corporationRatio;
    let corporationContribution =
      Number(corporationWaterRatio) * CORPORATION_WATER_RATE;
    let borewellWaterRatio = user.borewellRatio;
    let borewellContribution = Number(borewellWaterRatio) * BOREWELL_WATER_RATE;
    let ratioAccumulation =
      Number(corporationWaterRatio) + Number(borewellWaterRatio);
    let waterPricePerLiter =
      (corporationContribution + borewellContribution) / ratioAccumulation;
    let initalWater = round(
      people * PERSONAL_WATER_ALLOWANCE * DAYS_IN_A_MONTH
    );
    let initalWaterPrice = round(initalWater * waterPricePerLiter);
    let bill = calculateBill(initalWater, initalWaterPrice, peopleToAdd);
    res.json({ waterUsage: bill[0], cost: bill[1] });
  }
);

app.listen(81, function () {
  console.log("CORS-enabled web server listening on port 81");
});

function appartmentCheck(BHK_number: string) {
  let people: number = 0;
  if (BHK_number == "2BHK") people = 3;
  else if (BHK_number == "3BHK") people = 5;
  else console.log("Incorrect BHK size");
  return people;
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
