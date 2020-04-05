calculateJaccardSimilarity = (wordVector1, wordVector2) => {
    if (wordVector1.length !== wordVector2.length) return 0;

    let numerator = 0;
    let denominator = 0;
    for (let i = 0; i < wordVector1.length; i++) {
        numerator += Math.min(wordVector1[i], wordVector2[i]);
        denominator += Math.max(wordVector1[i], wordVector2[i]);
    }

    return numerator / denominator;
};


module.exports = calculateJaccardSimilarity;