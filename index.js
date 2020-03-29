const readCorpus = require('./processCorpus');
const calculateWordContextMatrix = require('./wordContextMatrix');
const calculateCosineDistance = require('./helpers/cosineDistance');
const createXmlFile = require('./createXml');

const CORPUS_DIRECTORY = './corpus/';
let CORPUS_DATA = {
    documentsList: [],
    lemmas: [],
    vocabulary: []
};
let WORD_CONTEXT_MATRIX = [[]];

run = async () => {
    try {
        CORPUS_DATA = await readCorpus(CORPUS_DIRECTORY);
        printStats();

        WORD_CONTEXT_MATRIX = calculateWordContextMatrix(
            CORPUS_DATA.vocabulary, CORPUS_DATA.lemmas, true
        );

        console.log(`Calculating context for each word...`);
        let wordContextMap = new Map();
        for (let i = 0; i < WORD_CONTEXT_MATRIX.length; i++) {
            let context = [];
            for (let j = i + 1; j < WORD_CONTEXT_MATRIX.length; j++) {
                const cosineValue = calculateCosineDistance(
                    WORD_CONTEXT_MATRIX[i],
                    WORD_CONTEXT_MATRIX[j]
                );
                if (cosineValue !== 0) {
                    context.push({
                        word: `${CORPUS_DATA.vocabulary[j]}`,
                        cosineValue
                    });
                }
            }
            wordContextMap.set(
                CORPUS_DATA.vocabulary[i],
                context.sort(compareCosineValues)
            );
        }

        await createXmlFile('wordsContext', wordContextMap);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(0);
    }
};

printStats = () => {
    console.log(
        `- Documents: ${CORPUS_DATA.documentsList.length}` +
        `\n- Words: ${CORPUS_DATA.lemmas.length}` +
        `\n- Vocabulary size: ${CORPUS_DATA.vocabulary.length}`
    );
};

compareCosineValues = (a, b) => {
    return b.cosineValue - a.cosineValue;
};


run();