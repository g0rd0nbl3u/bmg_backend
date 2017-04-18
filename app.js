// Load libraries
const koa = require('koa');
const logger = require('koa-logger');
const body = require('koa-better-body');
const error = require('koa-json-error');
const cors = require('kcors');
const path = require('path');
const mongo = require('koa-mongo');

// Setup
const router = module.exports.router = require('koa-router')();

// Load api
const upload_api = require('./app/api/upload_api');

// Setup app and make it available to other modules that import app.js
const app = module.exports.app = new koa();

// Setup mongo
app.use(mongo({
    host: 'localhost',
    port: 27017,
    db: 'bmg',
    max: 100,
    min: 1
}));

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
    .post('upload.product', '/upload/product', upload_api.uploadProduct);

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