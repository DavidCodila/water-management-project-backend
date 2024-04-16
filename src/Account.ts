import { random } from "lodash";

export class Account {
  private id: string;
  private appartmentType: string;
  private corporationRatio: string;
  private borewellRatio: string;
  private initalPeople: number;
  private additionalPeople: number;
  constructor(
    appartmentType: string,
    corporationRatio: string,
    borewellRatio: string
  ) {
    this.id = String(random(1, 99999));
    this.appartmentType = appartmentType;
    this.corporationRatio = corporationRatio;
    this.borewellRatio = borewellRatio;
    if (appartmentType == "2BHK") {
      this.initalPeople = 3;
    } else this.initalPeople = 5;
    this.additionalPeople = 0;
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
  addPeople(peopleToAdd: number) {
    this.additionalPeople += peopleToAdd;
  }
}
