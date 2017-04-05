const Koa = require('koa');
const Router = require('koa-router');
const multer = require('koa-multer');

const app = new Koa();
const _ = new Router();
const upload = multer({ dest: 'uploads/' });

//routes
_.post('/upload', upload.single('foto'), (ctx, next) => {
  ctx.body = "File Sucessfully uploaded";
  console.log(ctx.req.file);
});

app
  .use(_.routes())
  .use(_.allowedMethods());



app.listen(3000);
