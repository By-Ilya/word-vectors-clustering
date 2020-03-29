const {windowSize} = require('./config');

calculateWordContextMatrix = (vocabulary, lemmas, isPMI = false) => {
    console.log(`Calculating WordContextMatrix with h = ${windowSize}...`);

    let wordContextMatrix = initializeWordContextMatrix(vocabulary.length);

    for (let i = 0; i < lemmas.length; i++) {
        for (let j = i - windowSize; j < i; j++) {
            if (j >= 0) {
                const currentWordIndex = vocabulary.indexOf(lemmas[i]);
                const contextWordIndex = vocabulary.indexOf(lemmas[j]);
                wordContextMatrix[currentWordIndex][contextWordIndex] += 1;
            }
        }

        for (let j = i + 1; j <= i + windowSize; j++) {
            if (j < lemmas.length) {
                const currentWordIndex = vocabulary.indexOf(lemmas[i]);
                const contextWordIndex = vocabulary.indexOf(lemmas[j]);
                wordContextMatrix[currentWordIndex][contextWordIndex] += 1;
            }
        }
    }

    if (isPMI) console.log(`Calculating PMI values for matrix...`);

    return isPMI
        ? calculatePMIMatrix(wordContextMatrix, vocabulary.length)
        : wordContextMatrix;
};

initializeWordContextMatrix = (vocabularySize) => {
    let zeroWordContextMatrix = [];
    for (let i = 0; i < vocabularySize; i++) {
        zeroWordContextMatrix[i] = [];
        for (let j = 0; j < vocabularySize; j++) {
            zeroWordContextMatrix[i][j] = 0;
        }
    }

    return zeroWordContextMatrix
};

calculatePMIMatrix = (wordContextMatrix, vocabularySize) => {
    const sumCountWords = getSumCount(wordContextMatrix);
    let pmiContextMatrix = initializeWordContextMatrix(vocabularySize);

    for (let i = 0; i < wordContextMatrix.length; i++) {
        for (let j = 0; j < wordContextMatrix[i].length; j++) {
            pmiContextMatrix[i][j] = wordContextMatrix[i][j] / sumCountWords;
        }
    }

    return pmiContextMatrix;
};

getSumCount = (wordContextMatrix) => {
    let sumCountWords = 0;
    wordContextMatrix.forEach(row => {
        row.forEach(elem => {
            sumCountWords += elem;
        })
    });

    return sumCountWords;
};


module.exports = calculateWordContextMatrix;


/* Test block */
// const lemmas = ['the', 'quick', 'brown', 'fox', 'jump', 'over', 'the', 'lazy', 'dog'];
// const vocabulary = new Set();
// lemmas.forEach(lemma => {
//    vocabulary.add(lemma);
// });