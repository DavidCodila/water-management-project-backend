import { random } from "lodash";

export class Account {
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
}
