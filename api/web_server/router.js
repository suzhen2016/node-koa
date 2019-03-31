var router = require('koa-router')()
var user = require('./user')

//名片模块 router.use('/user', user.allowedMethods())
router.use('/user', user.routes())//添加路由请求的节点
//腾讯api
router.post('/businesscard',require('./recognition/request.js'))

module.exports = router