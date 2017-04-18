const fs = require('mz/fs');
const UploadService = require('../service/upload_service');

/**
 * Takes an xml file and converts it to json.
 * @param ctx
 * @returns {Promise.<void>}
 */
module.exports.uploadKnowledge = async ctx => {
    if (ctx.request.files[0].type === 'application/xml') {
        try {
            const file = await fs.readFile(ctx.request.files[0].path);
            ctx.body = await UploadService.xml2json(file);
        }
        catch (err) {
            ctx.throw(422, err);
        }
    } else {
        ctx.throw(422, 'File type should be application/xml');
    }
};

module.exports.uploadProduct = async ctx => {
    /*var query = {};
     if (ctx.query.evaluated) {
     query.evaluation = {
     $exists: true
     };
     }
     if (ctx.query.product) {
     query.product = ctx.query.product;
     }
     ctx.body = await ideas.find(query);*/
};