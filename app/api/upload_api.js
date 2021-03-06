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
    console.log(ctx.request.files[0]);
    if (!ctx.request.files) {
        ctx.throw(422, 'no file provided');
    }
    if (ctx.request.files[0].type === 'application/xml' || ctx.request.files[0].type === 'text/xml') {
        try {
            const file = await fs.readFile(ctx.request.files[0].path);
            let parsedJSON = ctx.body = await UploadService.xml2json(file);
            parsedJSON = [prepareKnowledgeForStoring(parsedJSON.node)];
            //console.log(JSON.stringify(parsedJSON,null,2));
            await knowledge.insert(parsedJSON);
            ctx.body = {sucess:true};
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
    if (ctx.request.files[0].type === 'application/xml' || ctx.request.files[0].type === 'text/xml') {
        try {
            const file = await fs.readFile(ctx.request.files[0].path);
            let parsedJSON = ctx.body = await UploadService.xml2json(file);
            parsedJSON = [prepareProductForStoring(parsedJSON.node)];
            await product.insert(parsedJSON);
            ctx.body = {success: true};
            ctx.status = 201;
        }
        catch (err) {
            ctx.throw(422, err)
        }
    } else {
        ctx.throw(422, 'File type should be application/xml')
    }
};

function prepareKnowledgeForStoring(mo) {
  mo.id = mo.attr.id;
  mo.name = mo.attr.name;
  delete mo.attr;
  //mo.expanded = true;
  mo.children = mo.node;
  delete mo.node;
  if (mo.children) {
    mo.children.forEach(function (key) {
        prepareKnowledgeForStoring(key);
    });
  }
  mo.createdAt = new Date();
  return mo;
}

function prepareProductForStoring(mo) {
    mo.id = mo.attr.id;
    mo.key = mo.attr.key;
    mo.value = mo.attr.value;
    delete mo.attr;
    //mo.expanded = true;
    mo.children = mo.node;
    delete mo.node;
    if (mo.children) {
        mo.children.forEach(function (key) {
            prepareProductForStoring(key);
        });
    }
    mo.createdAt = new Date();
    return mo;
}
