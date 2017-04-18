const koa     = require('koa');
const router  = require('koa-router');
const multer  = require('koa-multer');
const mongo   = require('koa-mongo');
const xmlParser = require('./services/xmlParse_service');

const app     = new koa();
const _       = new router();

app.use(mongo({
  host: 'localhost',
  port: 27017,
  db: 'bmg',
  max: 100,
  min: 1
}));


// UPLOAD SECTION
const upload  = multer({
  dest: 'uploads/',
  fileFilter: filterFunction
 });

// Nothing but XML-Files is OK to be uploaded
function filterFunction(req, file, cb) {
  try {
    if (file.mimetype !== "text/xml" && file.mimetype !== "application/xml") {
      cb(null, false);
      throw new Error('Wahrscheinlich keine XML-Datei \n Weder "application/xml" noch "text/xml"');
    }
    else {
      cb(null, true)
    }
  } catch (err) {
    cb(new Error('FileFilter Error:\n '+err));
  }
}

// Configure POST-Route for Knowledge Upload
_.post('/upload-knowledge', upload.single('datei'), async (ctx, next) => {
  let parsedXML = await xmlParser.parseFile(ctx.req.file.path);
  //console.log(JSON.stringify(parsedXML));

  //var parsedXML = await xmlParser.parseFile(ctx.req.file.path);
  //console.log(parsedXML);
  //let parsedJSON = await xmlParser.parse(ctx.req.file.path);
  //console.log(parsedJSON);
  //let result = await ctx.mongo.db('bmg').collection('knowledge').insertOne(parsedJSON);
  ctx.body = "OK";
});

// Configure POST-Route for Product Upload
_.post('/upload-product', upload.single('datei'), async (ctx, next) => {
  let parsedJSON = await xmlParser.parse(ctx.req.file.path);
  console.log(parsedJSON);
  let result = await ctx.mongo.db('bmg').collection('product').insert(parsedJSON);
  ctx.body = "OK";
});

  /* General mongo-Use Stuff*/
  /*app.use(async (ctx, next) => {
    const result = await ctx.mongo.db('test').collection('testify').insert({ name: 'unicorn' });
    const userId = result.ops[0]._id.toString();
    ctx.body = await ctx.mongo.db('test').collection('testify').find().toArray();
    ctx.mongo.db('test').collection('users').remove({
      _id: mongo.ObjectId(userId)
    });
  });*/


  app
    .use(_.routes())
    .use(_.allowedMethods());

app.listen(3000);
