const {corpusDirectory} = require('./config');
const readCorpus = require('./processCorpus');
const calculateWordContextMatrix = require('./wordContextMatrix');
const {
    calculateCosineDistance,
    calculateJaccardSimilarity,
    calculateKLDivergence,
    calculateJSDivergence
} = require('./vectorsSimilarity/index');
const calculateProbableContext = require('./calculateContext');
const createXmlFile = require('./createXml');

const args = process.argv.slice(2);

let CORPUS_DATA = {
    documentsList: [],
    lemmas: [],
    vocabulary: []
};
let WORD_CONTEXT_MATRIX = [[]];

run = async () => {
    if (args.length > 0) {
        try {
            CORPUS_DATA = await readCorpus(corpusDirectory);
            printStats();

            WORD_CONTEXT_MATRIX = calculateWordContextMatrix(
                CORPUS_DATA.vocabulary, CORPUS_DATA.lemmas, true
            );

            const similarityFunction = chooseSimilarityAlgorithm(
                parseInt(args[0])
            );
            const wordContextMap = calculateProbableContext(
                CORPUS_DATA.vocabulary, WORD_CONTEXT_MATRIX, similarityFunction
            );

            await createXmlFile('wordsContext', wordContextMap);

            process.exit(0);
        } catch (err) {
            console.error(err);
            process.exit(0);
        }
    } else {
        console.error('Error: specify command argument with the number of chosen algorithm');
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

chooseSimilarityAlgorithm = (algorithmArgument) => {
    switch (algorithmArgument) {
        case 1:
            console.log(`Chosen cosine similarity algorithm...`);
            return calculateCosineDistance;
        case 2:
            console.log(`Chosen Jaccard similarity algorithm...`);
            return calculateJaccardSimilarity;
        case 3:
            console.log(`Chosen Kullback-Leibler divergence algorithm...`);
            return calculateKLDivergence;
        case 4:
            console.log(`Chosen Jensen-Shannon divergence algorithm...`);
            return calculateJSDivergence;
        default:
            console.log(`${algorithmArgument} doesn't identified with any algorithm.`);
            console.log(`Using cosine similarity algorithm as default...`);
            return calculateCosineDistance;
    }
};


run();