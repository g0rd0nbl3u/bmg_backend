// Load libraries
const xml2js = require('xml2js');

module.exports = {
    /**
     * Take an XML-String and convert it to JSON. Wrap xml2js.parseString
     * inside a promise, that implements await.
     * See https://github.com/Leonidas-from-XIV/node-xml2js/issues/159#issuecomment-221166979
     * @param {String} xml
     * @return {JSON} file contents as json
     */
    async xml2json(xml) {
        return new Promise((resolve, reject) => {
            xml2js.parseString(xml, function (err, json) {
                if (err)
                    reject(err);
                else
                    resolve(json);
            });
        });
    }
};