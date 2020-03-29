const {writeDataToFile} = require('./helpers/filesHelper');
const {
    createXmlHeader,
    createXmlContext,
    createXmlWord
} = require('./helpers/xmlHelper');

const OUTPUT_PATH = './output-data/';
const COUNT_CONTEXT_WORDS = 20;

createXmlFile = async (documentName, wordContextMap) => {
    console.log(`Create XML file with contexts...`);
    let xmlRoot = createXmlHeader(documentName);

    for (let [word, context] of wordContextMap) {
        let xmlContext = createXmlContext(xmlRoot, word);

        let index = 0;
        context.every(wordObject => {
            if (index < COUNT_CONTEXT_WORDS) {
                createXmlWord(xmlContext, wordObject);
                index++;
                return true;
            } else return false;
        });
    }

    let xml = xmlRoot.end({ pretty: true });

    await writeDataToFile(
        OUTPUT_PATH + `${documentName}.xml`,
        xml
    );
};


module.exports = createXmlFile;