// Load libraries
const fs      = require('fs-promise');
const xml2js  = require('xml2js');
const parser  = new xml2js.Parser();

module.exports = {
  /**
  * Parse a given file w/ path and return json
  * @param {String} file
  */
  parseFile(file) {
    return new Promise((resolve, reject) => {
      fs.readFileSync(file, function(err, data) {
        console.log(err + "" + data);
        if (err) {
            console.log("HELLO");
            reject(err);
        }
        else {

          parser.parseString(data, function (err, result) {
            if (err) {
                console.log(JSON.stringify(err))
                reject(err)
            } else {
                resolve(result)
            }
          })
        }
      })
    })
  }
}
