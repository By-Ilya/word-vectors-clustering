let calculateProbableContext = (
    vocabulary, wordContextMatrix, similarityFunction, metricsSortRule
) => {
    console.log(`Calculating probable context for each word...`);
    let wordContextMap = new Map();
    for (let i = 0; i < wordContextMatrix.length; i++) {
        let context = [];
        for (let j = 0; j < wordContextMatrix.length; j++) {
            if (i !== j) {
                const similarity = similarityFunction(
                    wordContextMatrix[i],
                    wordContextMatrix[j]
                );
                if (similarity !== 0) {
                    context.push({
                        word: `${vocabulary[j]}`,
                        similarity
                    });
                }
            }
        }
        wordContextMap.set(
            vocabulary[i],
            context.sort(metricsSortRule)
        );
    }

    return wordContextMap;
};


module.exports = calculateProbableContext;