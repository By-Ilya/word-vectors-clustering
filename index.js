const {corpusDirectory} = require('./config');
const readCorpus = require('./processCorpus');
const calculateWordContextMatrix = require('./wordContextMatrix');
const calculateProbableContext = require('./calculateContext');
const createXmlFile = require('./createXml');

let CORPUS_DATA = {
    documentsList: [],
    lemmas: [],
    vocabulary: []
};
let WORD_CONTEXT_MATRIX = [[]];

run = async () => {
    try {
        CORPUS_DATA = await readCorpus(corpusDirectory);
        printStats();

        WORD_CONTEXT_MATRIX = calculateWordContextMatrix(
            CORPUS_DATA.vocabulary, CORPUS_DATA.lemmas, true
        );

        const wordContextMap = calculateProbableContext(
            CORPUS_DATA.vocabulary, WORD_CONTEXT_MATRIX
        );

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


run();