class Strategy  {
    public solars = [[0, 0, 0]];
    public maxAttempts = 0;

    constructor(maxAttempts) {
        this.maxAttempts = maxAttempts;
        for (let i = 0; i < maxAttempts; i++) {
            let attempt = new Array(3);
            attempt.push(this.solars);
        }
    }

    public addGreens(num) {
        let attemptNum = this.solars.length - 1;
        while (num > 0) {
            const GREEN = 0;
            const useAll = num <= 24 ? true : false;
            if (attemptNum <= 0) {
                console.error('attempt number is 0')
            }
            let attemptMats = this.solars[attemptNum];
            if (attemptMats[GREEN] === 24) {
                // skip
            } else if (attemptMats[0] === 0 && useAll) {
                attemptMats[GREEN] = num;
                break;
            } else if (attemptMats[GREEN] + num > 24) {
                num -= attemptMats[GREEN];
                attemptMats[GREEN] = 24;
            } else {

            }
            attemptNum--;
        }
    }

    public attemptUpgrade() {
        // found cigarrette butt in gutter, try to smoke it

    }

}