// Load libraries
const koa = require('koa');
const logger = require('koa-logger');
const body = require('koa-better-body');
const error = require('koa-json-error');
const cors = require('kcors');
const path = require('path');

// Setup app and make it available to other modules that import app.js
const app = module.exports.app = new koa();


// Setup
const router = module.exports.router = require('koa-router')();
const db = module.exports.db = require('monk')('localhost/bmg');

// Load api
const upload_api = require('./app/api/upload_api');
const block_manage_api = require('./app/api/block_manage_api');
const knowledge_manage_api = require('./app/api/knowledge_manage_api');
const product_manage_api = require('./app/api/product_manage_api');

// Setup app's middleware
app
    .use(error({
        format: err => {
            return {
                status: err.status,
                message: err.message
            }
        }
    }))
    .use(cors())
    .use(body({
        encoding: 'utf-8',
        uploadDir: path.join(__dirname, 'uploads'),
        keepExtensions: true
    }))
    .use(logger())
    .use(router.routes())
    .use(router.allowedMethods());

// Setup routes
router
    .post('upload.knowledge', '/upload/knowledge', upload_api.uploadKnowledge)
    .post('upload.product', '/upload/product', upload_api.uploadProduct)
    .get('knowledge_manage.getAll', '/knowledge/getAll', knowledge_manage_api.getAllKnowledge)
    .get('knowledge_manage.getIds', '/knowledge/getIds', knowledge_manage_api.getKnowledgeIds)
    .get('knowledge_manage.get', '/knowledge/get/:id', knowledge_manage_api.getSingleKnowledge)
    .put('knowledge_manage.update', '/knowledge/update/:id', knowledge_manage_api.updateKnowledge)
    .del('knowledge_manage.delete', '/knowledge/delete/:id', knowledge_manage_api.deleteKnowledge)
    .get('product_manage.getAll', '/product/getAll', product_manage_api.getAllProducts)
    .get('product_manage.getIds', '/product/getIds', product_manage_api.getProductIds)
    .get('product_manage.get', '/product/get/:id', product_manage_api.getSingleProduct)
    .put('product_manage.update', '/product/update/:id', product_manage_api.updateProduct)
    .del('product_manage.delete', '/product/delete/:id', product_manage_api.deleteProduct)
    .post('block_manage.add', '/block/add', block_manage_api.addBlock)
    .get('block_manage.get', '/block/get/:id', block_manage_api.getBlock)
    .put('block_manage.update', '/block/update/:id', block_manage_api.updateBlock)
    .del('block_manage.delete', '/block/delete/:id', block_manage_api.deleteBlock)
    .get('block_manage.getAll', '/block/getAll', block_manage_api.getAllBlocks);

app.listen(process.env.PORT || 3000);

/*

 // Configure POST-Route for Knowledge Upload
 _.post('/upload-knowledge', upload.single('datei'), async (ctx, next) => {
 console.log("Before await");
 let parsedXML = await
 JSON.stringify(xmlParser.parseFile(ctx.req.file.path));
 console.log("After await\n", parsedXML)
 ctx.body = "OK";
 })
 ;

 // Configure POST-Route for Product Upload
 _.post('/upload-product', upload.single('datei'), async(ctx, next) = > {
 let parsedJSON = await xmlParser.parse(ctx.req.file.path);
 console.log(parsedJSON);
 let result = await
 ctx.mongo.db('bmg').collection('product').insert(parsedJSON);
 ctx.body = "OK";
 })
 ;
 */