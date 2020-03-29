const calculateCosineDistance = require('./helpers/cosineDistance');


calculateProbableContext = (vocabulary, wordContextMatrix) => {
    console.log(`Calculating probable context for each word...`);
    let wordContextMap = new Map();
    for (let i = 0; i < wordContextMatrix.length; i++) {
        let context = [];
        for (let j = 0; j < wordContextMatrix.length; j++) {
            if (i !== j) {
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


module.exports = calculateProbableContext;