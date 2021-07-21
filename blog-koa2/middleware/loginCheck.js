const { ErrorModel } = require('../model/resModel')

// module.exports = (req, res, next) => {
//     if (req.session.username) {
//         next()
//         return
//     }
//     res.json(
//         new ErrorModel('未登录')
//     )
// }

module.exports = async (ctx, next) => {
    if (ctx.session.username) {
        await next()
        return
    }
    ctx.body = new ErrorModel('未登录')
    
}