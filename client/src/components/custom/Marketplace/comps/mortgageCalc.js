

export const mortgageCalc = (amt) => {
    let apr = 3.5
    let term = 25
    apr /= 1200
    term *= 12

    const payment = amt * (apr * Math.pow((1 + apr), term)) / (Math.pow((1 + apr), term) - 1);
    console.log('payment: ', payment.toFixed(2));
    
}

//@desc get property value based on monthly NOI  
export const incomeValue = async (noi) => {
    const dscr = 1.35
    const capExRes = 1000 
    //exit loan assumptions per dollar
    let apr = 5
    let term = 20
    apr /= 1200
    term *= 12
    const perDollerDS = (1 * (apr * Math.pow((1 + apr), term)) / (Math.pow((1 + apr), term) - 1) * 12)
    const answer = ((noi+capExRes) / dscr) / perDollerDS
    return answer.toFixed(2)
}









