function sim() {
    
    const greenCost = 29;
    const blueCost = 74;
    const purpCost = 368;
    const baseMatCost = 2930;
    const baseSuccess = 1000; // 15% chance
    const baseIncrease = 100; // 1.5% increase per miss
    const baseEnergyIncrease = 465; // 7% energy per miss
    
    const greenChance = 14; // .21% increase
    const blueChance = 28;
    const purpChance = 83;
    
    const greenIncrease = 6.5;
    const blueIncrease = 13;
    const purpIncrease = 38;
    
    //global vars
    var addtlEnergyFromRocks = 0;
    var addtlSuccessFromRocks = 0;
    var totalSuccess = 0;
    var totalSolarCost = 0;
    var numMaxEnergyHit = 0;
    var totalCost = 0;
    const runs = 100000;
    
    function upgradeItem(chance = totalSuccess, attemptNumber = 1, energy = 0, cost = 0) {
        // do not include solar cost if hit is guaranteed success
        cost += baseMatCost;
        if (energy >= 10000) { 
            numMaxEnergyHit += 1;
            totalCost += cost;
            return attemptNumber;
        }
        cost += totalSolarCost;

        // temp ---
        let extraChance = 0;
        let extraEnergy = 0;
        if (attemptNumber === 8) {
            // use 5 calcSolarCost
            // extraChance += greenChance * 17;

            // totalCost +=  greenCost * 17;
            
            // extraEnergy += greenIncrease * 17;
        }
        if (attemptNumber > 8) {
            // use 5 calcSolarCost
            extraChance += greenChance * 24;

            totalCost +=  greenCost * 24;
            
            extraEnergy += greenIncrease * 24;
        }
        if (attemptNumber > 9) {
            // use extra solars
            extraChance += blueChance * 12;

            totalCost += blueCost * 12;
            
            extraEnergy += blueIncrease * 12;
        } 
        
        if (attemptNumber > 10) {
            // use extra solars
            extraChance += purpChance * 4;

            totalCost += purpCost * 4;
            
            extraEnergy += purpIncrease * 4;
        } 
        
        let roll = Math.floor(Math.random()*10000);
        if (roll < (chance + extraChance)) {
            totalCost += cost;
            return attemptNumber;
        }

        
        // chance is in %, ie. first hit chance = 15

        const addtlEnergyIncrease = baseEnergyIncrease * (attemptNumber - 1) * 0.1 + addtlEnergyFromRocks;
        const nextEnergy = energy + baseEnergyIncrease + addtlEnergyIncrease + extraEnergy;
        return upgradeItem(chance + baseIncrease, attemptNumber + 1, nextEnergy, cost)
    }

    function describeEnergy(chance = totalSuccess, attemptNumber = 1, energy = 0) {
        console.log('attempt', attemptNumber, ' - chance', chance, ' - energy', energy/100 + '%')
        //console.log('energy still needed', 10000-energy);
        if (energy >= 10000) { 
            return attemptNumber;
        }
        let extraEnergy = 0;
        if (attemptNumber === 8) {
            // use 5 calcSolarCost
            //extraEnergy += greenIncrease * 17;
            //console.log('add 17 green solars')
        }
        if (attemptNumber > 8) {
            // use 5 calcSolarCost
            extraEnergy += greenIncrease * 23;
            console.log('add 24 green solars')
        }
        if (attemptNumber > 9) {
            extraEnergy += blueIncrease * 12;
            console.log('add 12 blue solars')
        }
        if (attemptNumber > 10) {
            extraEnergy += purpIncrease * 4;
            console.log('add 4 purp solars')
        }
        //     extraEnergy = blueIncrease * 5;
        // if (attemptNumber === 7) {
        //     // use 12 solars
        //     // console.log('add 9 blue solars, 23 green')
        //     // extraEnergy = greenIncrease * 17;
        // } else if (attemptNumber === 8) {
        //     console.log('..');
        //     extraEnergy = greenIncrease * 24 + blueIncrease * 12;
 
        // } else if (attemptNumber === 9) {
        //     console.log('add all solars');
        //     extraEnergy = blueIncrease * 12 + purpIncrease * 4 + greenIncrease * 24;
        // }

        const addtlEnergyIncrease = baseEnergyIncrease * (attemptNumber - 1) * 0.1 + addtlEnergyFromRocks;
        const nextEnergy = energy + baseEnergyIncrease + addtlEnergyIncrease + extraEnergy;
        return describeEnergy(chance + baseIncrease, attemptNumber + 1, nextEnergy)
    }
    
    function getAvgAttempts() {
        let total = 0;
        for (n = 0; n < runs; n++) {
             total += upgradeItem();
        }
        return (total/runs).toPrecision(3);
    }
    
    function calcAddtlEnergyFromRocks(green, blue, purp) {
        const totalGreen = green * greenIncrease;
        const totalBlue = blue * blueIncrease;
        const totalPurp = purp * purpIncrease;
        addtlEnergyFromRocks = totalGreen + totalBlue + totalPurp;
    }
    
    function calcAddtlSuccessFromRocks(green, blue, purp) {
        const totalGreen = green * greenChance;
        const totalBlue = blue * blueChance;
        const totalPurp = purp * purpChance;
        addtlSuccessFromRocks = totalGreen + totalBlue + totalPurp;
    }
    
    function calcSolarCost(green, blue, purp) {
        const totalGreen = green * greenCost;
        const totalBlue = blue * blueCost;
        const totalPurp = purp * purpCost;
        totalSolarCost = totalGreen + totalBlue + totalPurp;
    }
    
    function runSim(green, blue, purp) {
        // reset global vars
        addtlEnergyFromRocks = 0;
        addtlSuccessFromRocks = 0;
        totalSuccess = 0;
        totalSolarCost = 0;
        numMaxEnergyHit = 0;
        totalCost = 0;

        // set global vars
        calcSolarCost(green, blue, purp);
        calcAddtlEnergyFromRocks(green, blue, purp);
        calcAddtlSuccessFromRocks(green, blue, purp);
        totalSuccess = baseSuccess + addtlSuccessFromRocks;

        const result = getAvgAttempts();
        console.log('avg cost', Math.floor(totalCost/runs));
        describeEnergy();
        return result;
    }
    
    console.log('14 -> 15 -- armor -- 100k runs')
    console.log('green price:', greenCost, 'blue price:', blueCost, 'purp price:', purpCost)

    // console.log('no mats');
    const nomats = runSim(0, 0, 0);
    console.log('hits:', nomats, 'hit_max_fails:', Math.floor(numMaxEnergyHit/1000), '%');

    // console.log('grn');
    // const onlygreen = runSim(20, 0, 0);
    // console.log('hits:', onlygreen, 'hitmaxfails:', Math.floor(numMaxEnergyHit/1000), '%');
    
    // console.log('blue:');
    // const onlyblue = runSim(0, 16, 0);
    // console.log('hits:', onlyblue, 'hitmaxfails:', Math.floor(numMaxEnergyHit/1000), '%');

    // console.log('purp');
    // const onlypurp = runSim(0, 0, 3);
    // console.log('hits:', onlypurp, 'hitmaxfails:', Math.floor(numMaxEnergyHit/1000), '%');

    // console.log('greenblue')
    // const greenblue = runSim(20, 16, 0);
    // console.log('hits:', greenblue, 'hitmaxfails:', Math.floor(numMaxEnergyHit/1000), '%');

    // console.log('greenpurp');
    // const greenpurp = runSim(20, 0, 3);
    // console.log('hits:', greenpurp, 'hitmaxfails:', Math.floor(numMaxEnergyHit/1000), '%');

    // console.log('bluepurp')
    // const bluepurp = runSim(0, 16, 3);
    // console.log('hits:', greenpurp, 'hitmaxfails:', Math.floor(numMaxEnergyHit/1000), '%');

    // console.log('all mats')
    // const all = runSim(20, 16, 3);
    // console.log('hits:', all, 'hitmaxfails:', Math.floor(numMaxEnergyHit/1000), '%');
}

sim();