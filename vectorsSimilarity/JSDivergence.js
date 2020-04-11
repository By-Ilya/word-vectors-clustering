const calculateKLDivergence = require('./KLDivergence');

let calculateJSDivergence = (wordVector1, wordVector2) => {
    if (wordVector1.length !== wordVector2.length) return 0;

    const secondArgument = [];
    for (let i = 0; i < wordVector1.length; i++) {
        secondArgument.push(
            (wordVector1[i] + wordVector2[i]) / 2
        );
    }

    return calculateKLDivergence(wordVector1, secondArgument) +
        calculateKLDivergence(wordVector2, secondArgument);
};


module.exports = calculateJSDivergence;