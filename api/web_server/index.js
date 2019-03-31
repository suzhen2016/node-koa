const Koa = require('koa')
// const koaBody = require('koa-body')({
//     multipart: true,  // 允许上传多个文件
//     formidable: { 
//         uploadDir: 'public/images/headImage',// 上传的文件存储的路径 
//         keepExtensions: true  //  保存图片的扩展名
//     }
// })
const api = require('./router.js')
const router = require('koa-router')()
let bodyParser = require('koa-body');
const response = require('../untils/model/respones')
const ip = require('../untils/factory/ip')
let app = new Koa();
app.use(bodyParser())

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.use(async (ctx, next) => {
    try {
        ctx.set('Access-Control-Allow-Origin', '*')
        ctx.set(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Content-Length, Accept, User-Agent, x-access-token, version, package-name'
        )
        ctx.set(
            'Access-Control-Allow-Methods',
            'PUT, POST, GET, DELETE, OPTIONS'
        )
        ctx.set('Cache-control', 'max-age=0, private, must-revalidate')
        // console.log()
        if (ctx.request.method == 'OPTIONS') {
            ctx.response.status = 200
        }
        
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500
        ctx.response.body = {
            message: '服务报错'
        }
    }
    await next()
    console.log('end')
})

//以下是测试代码
let a = router.post('/demo',async (ctx,next) => {
    // => POST body
    // ctx.response.status = 200
    
    if(ctx.request.body.name){
        let data = {page:1,data:[{name:'22'},{name:'33'}]}
        // ctx.body = ctx
        response.success(ctx,data,'成功查询')
    }else response.success(ctx,{},'参数不符合')
    
})

router.use('/app',a.routes())

router.use('/api', api.routes()) //A:添加每个方法的请求加前缀，也可在 实例化router时添加参数注册prefix
//注册使用路由中间件
app.use(router.routes())

app.use(router.allowedMethods())//添加针对OPTIONS的响应处理，一些预检请求会先触发 OPTIONS 然后才是真正的请求

//记录机器ip、端口
global.server_ip = ip.get_ip();

global.server_port = 5000;
//
app.listen(global.server_port, function () {
  console.log(global.server_ip,global.server_port);
});

