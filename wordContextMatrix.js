const {windowSize, alpha} = require('./config');

calculateWordContextMatrix = (vocabulary, lemmas, isPMI = false) => {
    console.log(`Calculating WordContextMatrix with h = ${windowSize}...`);

    let wordContextMatrix = initializeWordContextMatrix(vocabulary.length);

    for (let i = 0; i < lemmas.length; i++) {
        const leftContextBorder = Math.max(0, i - windowSize);
        const rightContextBorder = Math.min(lemmas.length - 1, i + windowSize);

        for (let j = leftContextBorder; j <= rightContextBorder; j++) {
            if (j !== i) {
                const mainWordIndex = vocabulary.indexOf(lemmas[i]);
                const contextWordIndex = vocabulary.indexOf(lemmas[j]);
                wordContextMatrix[mainWordIndex][contextWordIndex] += 1;
            }
        }
    }

    if (isPMI) console.log(`Calculating PMI values for matrix...`);

    return isPMI
        ? calculateSmoothedPMIMatrix(wordContextMatrix, vocabulary.length)
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

calculateSmoothedPMIMatrix = (wordContextMatrix, vocabularySize) => {
    let pmiContextMatrix = initializeWordContextMatrix(vocabularySize);

    const skipGramsSum = getSkipGramsSum(wordContextMatrix);
    const sumOverContexts = getSumOverContexts(wordContextMatrix);
    for (let i = 0; i < wordContextMatrix.length; i++) {
        const sumOverWordAlpha = getSumOverWordAlpha(wordContextMatrix[i]);
        for (let j = 0; j < wordContextMatrix[i].length; j++) {
            const Pwc = wordContextMatrix[i][j] / skipGramsSum;
            const Pw = sumOverContexts[j] / skipGramsSum;
            const Pca = sumOverWordAlpha / skipGramsSum;
            const smoothedPMI = Math.log2(Pwc / (Pw * Pca));

            pmiContextMatrix[i][j] = Math.max(0, smoothedPMI);
        }
    }


    return pmiContextMatrix;
};

getSkipGramsSum = (wordContextMatrix) => {
    let skipGramsSum = 0;
    wordContextMatrix.forEach(row => {
        row.forEach(elem => {
            skipGramsSum += elem;
        })
    });

    return skipGramsSum;
};

getSumOverContexts = (wordContextMatrix) => {
    let sumOverContexts = [];
    for (let j = 0; j < wordContextMatrix.length; j++) {
        let rowSum = 0;
        for (let i = 0; i < wordContextMatrix.length; i++) {
            rowSum += wordContextMatrix[i][j];
        }
        sumOverContexts.push(rowSum);
    }

    return sumOverContexts;
};

getSumOverWordAlpha = (wordContextRow) => {
    return Math.pow(wordContextRow.reduce(reducer), alpha);
};

reducer = (accum, currentValue) => accum + currentValue;


module.exports = calculateWordContextMatrix;


/* Test block */
// const lemmas = ['the', 'quick', 'brown', 'fox', 'jump', 'over', 'the', 'lazy', 'dog'];
// const vocabulary = new Set();
// lemmas.forEach(lemma => {
//    vocabulary.add(lemma);
// });
