// 判断环境
// 发布环境
if (process.env.NODE_ENV === 'production') {
    // 发布环境文件发布位置
    module.exports = {
        // 文件发布进入 server/static/home 目录下
        outputDir: '../server/static/home/',
        // 模板发布进入 server/static/views 目录下
        indexPath: '../../views/index.html',
        // 静态资源相对位置
        publicPath: '/static/home'
    }
} else {
    //开发环境
    module.exports = {
        // 跨域请求代理
        devServer: {
            // 代理
            proxy: {
                '/data': {
                    // 目标地址
                    target: 'http://localhost:3018'
                }
            }
        }
    }
}