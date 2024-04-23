"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAdditionalWaterRequiredPriceService = void 0;
function calculateAdditionalWaterRequiredPriceService(water) {
    var cost = 0;
    if (water < 501) {
        cost = 2 * water;
    }
    else if (501 < water && water < 1501) {
        cost = 1000 + (water - 500) * 3;
    }
    else if (1501 < water && water < 3001) {
        cost = 4000 + (water - 1500) * 5;
    }
    else {
        cost = 11500 + (water - 3000) * 8;
    }
    return cost;
}
exports.calculateAdditionalWaterRequiredPriceService = calculateAdditionalWaterRequiredPriceService;
