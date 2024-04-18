import { random, round } from "lodash";

const CORPORATION_WATER_RATE = 1;
const BOREWELL_WATER_RATE = 1.5;
const PERSONAL_WATER_ALLOWANCE = 10;
const DAYS_IN_A_MONTH = 30;
const PERSONAL_WATER_ALLOWANCE_PER_MONTH =
  PERSONAL_WATER_ALLOWANCE * DAYS_IN_A_MONTH;

export class account {
  private id: string;
  private appartmentType: string;
  private corporationRatio: number;
  private borewellRatio: number;
  private initalPeople: number;
  private additionalPeople: number;
  private waterAmmount: number;
  private cost: number;
  constructor(
    appartmentType: string,
    corporationRatio: number,
    borewellRatio: number
  ) {
    this.id = String(random(1, 99999));
    this.appartmentType = appartmentType;
    this.corporationRatio = corporationRatio;
    this.borewellRatio = borewellRatio;
    if (appartmentType == "2BHK") {
      this.initalPeople = 3;
    } else this.initalPeople = 5;
    this.additionalPeople = 0;
    this.waterAmmount = 0;
    this.cost = 0;
  }
  getId() {
    return this.id;
  }
  getAppartmentType() {
    return this.appartmentType;
  }
  getCorporationRatio() {
    return this.corporationRatio;
  }
  getBorewellRatio() {
    return this.borewellRatio;
  }
  getInitalPeople() {
    return this.initalPeople;
  }
  getAdditionalPeople() {
    return this.additionalPeople;
  }
  getWaterAmount() {
    return this.waterAmmount;
  }
  getCost() {
    return this.cost;
  }
  addCost(costToAdd: number) {
    this.cost += costToAdd;
  }
  addPeople(peopleToAdd: number) {
    this.additionalPeople += peopleToAdd;
  }
  addWater(waterAmountToAdd: number) {
    this.waterAmmount += waterAmountToAdd;
  }
  calculateInitalWaterRequired() {
    return round(this.initalPeople * PERSONAL_WATER_ALLOWANCE_PER_MONTH);
  }
  calculateInitalWaterPrice() {
    const waterPricePerLiter = this.calculateWaterPricePerLitre();
    return waterPricePerLiter * this.getWaterAmount();
  }
  calculateWaterPricePerLitre(): number {
    let corporationContribution =
      this.getCorporationRatio() * CORPORATION_WATER_RATE;
    let borewellContribution = this.getBorewellRatio() * BOREWELL_WATER_RATE;
    let ratioAccumulation =
      this.getCorporationRatio() + this.getBorewellRatio();
    return (corporationContribution + borewellContribution) / ratioAccumulation;
  }
  calculateAdditionalWaterRequired() {
    return round(this.additionalPeople * PERSONAL_WATER_ALLOWANCE_PER_MONTH);
  }
}
