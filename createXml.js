const {writeDataToFile} = require('./helpers/filesHelper');
const {
    createXmlHeader,
    createXmlContext,
    createXmlWord
} = require('./helpers/xmlHelper');

const {countContextWords, outputPath} = require('./config');

createXmlFile = async (documentName, wordContextMap) => {
    console.log(`Create XML file with contexts...`);
    let xmlRoot = createXmlHeader(documentName);

    for (let [word, context] of wordContextMap) {
        let xmlContext = createXmlContext(xmlRoot, word);

        let index = 0;
        context.every(wordObject => {
            if (index < countContextWords) {
                createXmlWord(xmlContext, wordObject);
                index++;
                return true;
            } else return false;
        });
    }

    let xml = xmlRoot.end({ pretty: true });

    await writeDataToFile(
        outputPath + `${documentName}.xml`,
        xml
    );
};


module.exports = createXmlFile;