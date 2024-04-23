"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.account = void 0;
var lodash_1 = require("lodash");
var calculateAdditionalWaterRequiredPriceService_1 = require("../services/calculateAdditionalWaterRequiredPriceService");
var CORPORATION_WATER_RATE = 1;
var BOREWELL_WATER_RATE = 1.5;
var PERSONAL_WATER_ALLOWANCE = 10;
var DAYS_IN_A_MONTH = 30;
var PERSONAL_WATER_ALLOWANCE_PER_MONTH = PERSONAL_WATER_ALLOWANCE * DAYS_IN_A_MONTH;
var account = /** @class */ (function () {
    function account(appartmentType, corporationRatio, borewellRatio) {
        this.id = String((0, lodash_1.random)(1, 99999));
        this.appartmentType = appartmentType;
        this.corporationRatio = corporationRatio;
        this.borewellRatio = borewellRatio;
        if (appartmentType == "2BHK") {
            this.initalPeople = 3;
        }
        else
            this.initalPeople = 5;
        this.additionalPeople = 0;
        this.initalWaterAmmount = 0;
        this.additionalWaterAmount = 0;
        this.cost = 0;
    }
    account.prototype.getId = function () {
        return this.id;
    };
    account.prototype.getAppartmentType = function () {
        return this.appartmentType;
    };
    account.prototype.getCorporationRatio = function () {
        return this.corporationRatio;
    };
    account.prototype.getBorewellRatio = function () {
        return this.borewellRatio;
    };
    account.prototype.getInitalPeople = function () {
        return this.initalPeople;
    };
    account.prototype.getAdditionalPeople = function () {
        return this.additionalPeople;
    };
    account.prototype.getInitalWaterAmount = function () {
        return this.initalWaterAmmount;
    };
    account.prototype.getAdditionalWaterAmount = function () {
        return this.additionalWaterAmount;
    };
    account.prototype.getCost = function () {
        return this.cost;
    };
    account.prototype.addCost = function (costToAdd) {
        this.cost += costToAdd;
    };
    account.prototype.addPeople = function (peopleToAdd) {
        this.additionalPeople += peopleToAdd;
    };
    account.prototype.addInitalWater = function (waterAmountToAdd) {
        this.initalWaterAmmount += waterAmountToAdd;
    };
    account.prototype.addAdditionalWater = function (waterAmountToAdd) {
        this.additionalWaterAmount += waterAmountToAdd;
    };
    account.prototype.getWaterUsage = function () {
        return this.initalWaterAmmount + this.additionalWaterAmount;
    };
    account.prototype.calculateInitalWaterRequired = function () {
        return (0, lodash_1.round)(this.initalPeople * PERSONAL_WATER_ALLOWANCE_PER_MONTH);
    };
    account.prototype.calculateInitalWaterPrice = function () {
        var waterPricePerLiter = this.calculateWaterPricePerLitre();
        return waterPricePerLiter * this.getInitalWaterAmount();
    };
    account.prototype.calculateWaterPricePerLitre = function () {
        var corporationContribution = this.getCorporationRatio() * CORPORATION_WATER_RATE;
        var borewellContribution = this.getBorewellRatio() * BOREWELL_WATER_RATE;
        var ratioAccumulation = this.getCorporationRatio() + this.getBorewellRatio();
        return (corporationContribution + borewellContribution) / ratioAccumulation;
    };
    account.prototype.calculateAdditionalWaterRequired = function () {
        return (0, lodash_1.round)(this.additionalPeople * PERSONAL_WATER_ALLOWANCE_PER_MONTH);
    };
    account.prototype.setTotalWaterAmount = function () {
        var initalWaterRequired = this.calculateInitalWaterRequired();
        this.addInitalWater(initalWaterRequired);
        var additionalWaterRequired = this.calculateAdditionalWaterRequired();
        this.addAdditionalWater(additionalWaterRequired);
    };
    account.prototype.setTotalCost = function () {
        var initalWaterRequiredPrice = this.calculateInitalWaterPrice();
        this.addCost(initalWaterRequiredPrice);
        var additionalWaterRequiredPrice = (0, calculateAdditionalWaterRequiredPriceService_1.calculateAdditionalWaterRequiredPriceService)(this.calculateAdditionalWaterRequired());
        this.addCost(additionalWaterRequiredPrice);
    };
    return account;
}());
exports.account = account;
