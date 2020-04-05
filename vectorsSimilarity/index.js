const calculateCosineDistance = require('./cosineDistance');
const calculateJaccardSimilarity = require('./JaccardSimularity');
const calculateKullbackLeiblerDivergence = require('./KullbackLeiblerDivergence');
const calculateJensenShannonDivergence = require('./JensenShannonDivergence');


module.exports = {
    calculateCosineDistance,
    calculateJaccardSimilarity,
    calculateKullbackLeiblerDivergence,
    calculateJensenShannonDivergence
};