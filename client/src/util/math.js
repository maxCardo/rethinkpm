
//supportFunctions
export const arrAvg = arr => (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2)
export const arrMax = arr => Math.max(...arr);
export const arrMin = arr => Math.min(...arr);
export const arrSum = arr => arr.reduce((a, b) => a + b, 0)

export const getStanDev = (array) => {
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    return (Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)).toFixed(3)
}

//@desc returns x percentile record in an array
export const getQuantile = (arr, q) => {
    const sorted = arr.sort((a, b) => a - b);
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
        return sorted[base];
    }
}

//@desc returns average of top x percentile records in an array
export const getQuantMean = (arr, q, q2) => {
    const sorted = arr.sort((a, b) => a - b);
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const pos2 = q2 ? Math.floor((sorted.length - 1) * q2) : sorted.length;
    const close = pos2 != base ? pos2 : pos2 + 1
    console.log('base: ', base, 'pos2: ', close);
    const priceArr = sorted.slice(base, close)
    console.log('priceArr in math: ', priceArr);
    return arrAvg(priceArr)
}

//@desc returns arr of top x percentile records in an array
export const getQuantArr = (arr, q, q2) => {
    const sorted = arr.sort((a, b) => a - b);
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const pos2 = q2 ? Math.floor((sorted.length - 1) * q2) : sorted.length;
    const close = pos2 != base ? pos2 : pos2 + 1
    return sorted.slice(base, close)
}

