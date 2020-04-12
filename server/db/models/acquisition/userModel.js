//user mode; for underwiting assumptions
const userUWModelSchema = new mongoose.Schema({
    deal: {
        tradeOut: {
            marketGrowth: {},
            targetIncrease: {
                targettoMarket: {},
                minIncrease: {},
                maxIncrease: {},
            }
        },
    },
});

module.exports = UW = mongoose.model('UserUWModel', userUWModelSchema);