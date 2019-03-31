const request = require('request')
const response = require('../../untils/model/respones')
class info{
    constructor(){

    }
    //接口实际处理逻辑
    static async main(ctx, next){
        try {
            let data = {name:'苏镇',work:'web 全栈'};
            response.success(ctx,data)
        } catch (error) {
            ctx.body = {code:201,message:'fail'}
            console.log(error)
        }
    }
    
}
module.exports = info.main;