const app = require('../../app');
const UploadService = require('../service/upload_service');
const fs            = require('mz/fs');
const knowledge     = app.db.get('knowledge');
const product       = app.db.get('product');
/**
 * Takes an xml file and converts it to json.
 * Then saves it to Mongo-Database 'bmg' in
 * collection 'knowledge' via 'app.js'
 * @param ctx
 * @returns {Promise.<void>}
 */

module.exports.uploadKnowledge = async ctx => {
    if (!ctx.request.files) {
        ctx.throw(422, 'no file provided');
    }
    if (ctx.request.files[0].type === 'application/xml') {
        try {
            const file = await fs.readFile(ctx.request.files[0].path);
            let parsedXML = ctx.body = await UploadService.xml2json(file);
            ctx.body = parsedXML;
            await knowledge.insert(parsedXML);
            ctx.status = 201;
        }
        catch (err) {
            ctx.throw(422, err)
        }
    } else {
        ctx.throw(422, 'File type should be application/xml')
    }
};

module.exports.uploadProduct = async ctx => {
    if (ctx.request.files[0].type === 'application/xml') {
        try {
            const file = await fs.readFile(ctx.request.files[0].path);
            let parsedXML = ctx.body = await UploadService.xml2json(file);
            ctx.body = parsedXML;
            await product.insert(parsedXML);
            ctx.status = 201;
        }
        catch (err) {
            ctx.throw(422, err)
        }
    } else {
        ctx.throw(422, 'File type should be application/xml')
    }
};