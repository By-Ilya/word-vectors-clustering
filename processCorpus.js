const natural = require('natural');
const { lemmatizer } = require('lemmatizer');
const stopwords = require('stopwords');

const {
    getFilesFromDirectory,
    readDataFromFile
} = require('./helpers/filesHelper');
const createVocabularySet = require('./helpers/vocabularyHelper');

const tokenizer = new natural.WordTokenizer();

const REDUNDANT_FILES_NAMES = ['.DS_Store'];

readCorpus = async (corpusDirectory) => {
    try {
        const documentsList = removeRedundantDocuments(
            await getFilesListFromCorpus(corpusDirectory)
        );
        const tokens = await getTokensFromDocuments(
            corpusDirectory, documentsList
        );
        const lemmas = getLemmasFromTokens(tokens);
        const vocabulary = Array.from(
            createVocabularySet(lemmas)
        );

        return {documentsList, lemmas, vocabulary};
    } catch (err) {
        throw err;
    }
};

getFilesListFromCorpus = async (corpusDirectory) => {
    console.log('Getting documents from corpus folder...');
    try {
        return await getFilesFromDirectory(
            corpusDirectory
        );
    } catch (err) {
        throw err;
    }
};

removeRedundantDocuments = documentsList => {
    return documentsList.filter(fileName =>
        REDUNDANT_FILES_NAMES.indexOf(fileName) === -1
    );
};

getTokensFromDocuments = async (corpusDirectory, documentsList) => {
    console.log('Getting tokens from documents...');
    let tokens = [];
    try {
        for (let fileName of documentsList) {
            const dataFromFile = await readDataFromFile(
                corpusDirectory + fileName
            );
            tokens = tokens.concat(
                tokenizer.tokenize(dataFromFile)
            );
        }

        return tokens.map(t => {
            return t.toLowerCase();
        });
    } catch (err) {
        throw err;
    }
};

getLemmasFromTokens = tokens => {
    console.log('Getting lemmas from tokens without stop words...');
    return tokens
        .map(token => lemmatizer(token))
        .filter(lemma =>
            stopwords.english.indexOf(lemma) === -1
        );
};


module.exports = readCorpus;



