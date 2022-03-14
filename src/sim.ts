class Sim {
    // sim config
    private runs: number = 100000;

    // item level info
    private baseIncrease: number = 100;
    private baseEnergyIncrease: number = 465;
    private baseSuccess: number = 1000;

    // mat prices
    private greenCost: number = 29;
    private blueCost: number = 74;
    private purpCost: number = 368;
    private baseMatCost: number = 2930;
    
    // chance increase
    private greenChance: number = 14;
    private blueChance: number = 28;
    private purpChance: number = 83;
    
    // artisan increase
    private greenIncrease: number = 6.5;
    private blueIncrease: number = 13;
    private purpIncrease: number = 38;

    // energy model
    private energyModel: Array<number> = [0];
    private minAttempts = 0;
    private maxAttempts = 0;
    // sim results

    constructor() {
        this.maxAttempts = this.getMaxAttempts();
        this.minAttempts = this.getMinAttempts();
        console.log('min attempts:', this.minAttempts, 'max attempts:', this.maxAttempts);
    }

    public genModelEnergy(addedArtisanEnergy: number = 0, attemptNumber: number = 1, energy: number = 0) : number {
        // console.log('attempt', attemptNumber, ' - chance', chance, ' - energy', energy/100 + '%')
        addedArtisanEnergy === 0 ? this.energyModel.push(energy) : null;
        if (energy >= 10000) {
            return attemptNumber;
        }
        const addtlEnergyIncrease = this.baseEnergyIncrease * (attemptNumber - 1) * 0.1;
        const nextEnergy = energy + this.baseEnergyIncrease + addtlEnergyIncrease + addedArtisanEnergy;
        return this.genModelEnergy(addedArtisanEnergy, attemptNumber + 1, nextEnergy)
    }

    public getEnergy(greenNum: number, blueNum: number = 0, purpNum: number = 0): number {
        return this.greenIncrease * greenNum + this.blueIncrease * blueNum + this.purpIncrease * purpNum;
    }

    public getMaxAttempts(): number {
        return this.genModelEnergy();
    }

    public getMinAttempts(): number {
        const energy = this.getEnergy(24, 12, 4);
        return this.genModelEnergy(energy);
    }

    // set 1 fewer attempt
        // calc possible combinations to get this
        // get total green, split across attempts
            // calc cost
        // remove n green from front, add m blue to back
            // calc cost
                // remove x blue from front, add y purp to back
                // calc cost
                // loop
                // continue until blue and purp and being moved on the same attempt number
            // loop
            // continue until green and blue are being moved on the same attempt number
    // keep setting fewer attempts until no longer possible with full mats

}

export default Sim;