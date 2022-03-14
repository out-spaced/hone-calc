"use strict";
exports.__esModule = true;
var Sim = /** @class */ (function () {
    // sim results
    function Sim() {
        // energy model
        this.energyModel = [0];
        this.minAttempts = 0;
        this.maxAttempts = 0;
        this.maxAttempts = this.genModelEnergy();
        this.minAttempts = this.getMinAttempts();
        console.log('min attempts:', this.minAttempts, 'max attempts:', this.maxAttempts);
    }
    Sim.prototype.genModelEnergy = function (addedArtisanEnergy, attemptNumber, energy) {
        if (addedArtisanEnergy === void 0) { addedArtisanEnergy = 0; }
        if (attemptNumber === void 0) { attemptNumber = 1; }
        if (energy === void 0) { energy = 0; }
        // console.log('attempt', attemptNumber, ' - chance', chance, ' - energy', energy/100 + '%')
        addedArtisanEnergy === 0 ? this.energyModel.push(energy) : null;
        if (energy >= 10000) {
            return attemptNumber;
        }
        var addtlEnergyIncrease = Sim.baseEnergyIncrease * (attemptNumber - 1) * 0.1;
        var nextEnergy = energy + Sim.baseEnergyIncrease + addtlEnergyIncrease + addedArtisanEnergy;
        return this.genModelEnergy(addedArtisanEnergy, attemptNumber + 1, nextEnergy);
    };
    Sim.prototype.getEnergy = function (greenNum, blueNum, purpNum) {
        if (blueNum === void 0) { blueNum = 0; }
        if (purpNum === void 0) { purpNum = 0; }
        return Sim.greenIncrease * greenNum + Sim.blueIncrease * blueNum + Sim.purpIncrease * purpNum;
    };
    Sim.prototype.getMinAttempts = function () {
        var energy = this.getEnergy(24, 12, 4);
        return this.genModelEnergy(energy);
    };
    // sim config
    Sim.runs = 100000;
    // item level info
    Sim.baseIncrease = 100;
    Sim.baseEnergyIncrease = 465;
    Sim.baseSuccess = 1000;
    // mat prices
    Sim.greenCost = 29;
    Sim.blueCost = 74;
    Sim.purpCost = 368;
    Sim.baseMatCost = 2930;
    // chance increase
    Sim.greenChance = 14;
    Sim.blueChance = 28;
    Sim.purpChance = 83;
    // artisan increase
    Sim.greenIncrease = 6.5;
    Sim.blueIncrease = 13;
    Sim.purpIncrease = 38;
    return Sim;
}());
exports["default"] = Sim;
