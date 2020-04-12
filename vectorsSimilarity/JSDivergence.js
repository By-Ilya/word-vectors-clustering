const MAX_DIVERGENCE = 2147483646;

let calculateJSDivergence = (wordVector1, wordVector2) => {
    if (wordVector1.length !== wordVector2.length) return MAX_DIVERGENCE;

    const sumComponents1 = getSumVectorComponents(wordVector1);
    const sumComponents2 = getSumVectorComponents(wordVector2);

    let jsDivergence = 0;
    for (let i = 0; i < wordVector1.length; i++) {
        if (wordVector1[i] === 0 && wordVector2[i] === 0)
            continue;

        if (wordVector1[i] === 0 || wordVector2[i] === 0) {
            jsDivergence += Math.log(MAX_DIVERGENCE);
            continue;
        }

        const pI = wordVector1[i] / sumComponents1;
        const qI = wordVector2[i] / sumComponents2;
        const modifiedQI = (pI + qI) / 2;

        jsDivergence += (pI * Math.log(pI / modifiedQI)) + (qI * Math.log(qI / modifiedQI));
    }

    return jsDivergence;
};

getSumVectorComponents = (wordVector) => {
    return wordVector.reduce(reducer, 0);
}

reducer = (accum, value) => accum + value;


module.exports = calculateJSDivergence;