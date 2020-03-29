require('dotenv').config();

const corpusDirectory = process.env.CORPUS_DIRECTORY || './corpus/';
const windowSize = parseInt(process.env.WINDOW_SIZE) || 3;
const alpha = parseFloat(process.env.ALPHA) || 0.75;
const countContextWords = parseInt(process.env.COUNT_CONTEXT_WORDS) || 20;
const outputPath = process.env.OUTPUT_PATH || './output-data/';


module.exports = {
    corpusDirectory,
    windowSize,
    alpha,
    countContextWords,
    outputPath
};