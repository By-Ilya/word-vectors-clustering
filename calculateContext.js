const calculateCosineDistance = require('./helpers/cosineDistance');


calculateContext = (vocabulary, wordContextMatrix) => {
    console.log(`Calculating context for each word...`);
    let wordContextMap = new Map();
    for (let i = 0; i < wordContextMatrix.length; i++) {
        let context = [];
        for (let j = i + 1; j < wordContextMatrix.length; j++) {
            const cosineValue = calculateCosineDistance(
                wordContextMatrix[i],
                wordContextMatrix[j]
            );
            if (cosineValue !== 0) {
                context.push({
                    word: `${vocabulary[j]}`,
                    cosineValue
                });
            }
        }
        wordContextMap.set(
            vocabulary[i],
            context.sort(compareCosineValues)
        );
    }

    return wordContextMap;
};

compareCosineValues = (a, b) => {
    return b.cosineValue - a.cosineValue;
};


module.exports = calculateContext;