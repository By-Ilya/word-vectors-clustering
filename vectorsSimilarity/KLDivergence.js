let calculateKLDivergence = (wordVector1, wordVector2) => {
    if (wordVector1.length !== wordVector2.length) return 0;

    const normalizedWordVector1 = normalizeWordVector(wordVector1);
    const normalizedWordVector2 = normalizeWordVector(wordVector2);

    let divergence = 0;
    for (let i = 0; i < normalizedWordVector1.length; i++) {
        if (!normalizedWordVector1[i] || !normalizedWordVector2[i]) {
            continue;
        }

        divergence += normalizedWordVector1[i] + Math.log(
            normalizedWordVector1[i] / normalizedWordVector2[i]
        );
    }

    return divergence;
};

normalizeWordVector = (wordVector) => {
    const sumComponents = wordVector.reduce(reducer);

    return wordVector.map(component => {
        return component / sumComponents;
    });
};

reducer = (accum, value) => accum + value;


module.exports = calculateKLDivergence;