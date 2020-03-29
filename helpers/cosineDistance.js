calculateCosineDistance = (wordVector1, wordVector2) => {
    let dotProd = 0;
    let sqA = 0;
    let sqB = 0;

    for (let i = 0; i < wordVector1.length; i++) {
        dotProd += wordVector1[i] * wordVector2[i];
        sqA += Math.pow(wordVector1[i], 2);
        sqB += Math.pow(wordVector2[i], 2);
    }

    return dotProd / (Math.sqrt(sqA) * Math.sqrt(sqB))
};


module.exports = calculateCosineDistance;