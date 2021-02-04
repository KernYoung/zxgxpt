// vue.config.js
var path = require('path')
module.exports = {
    devServer: {
        overlay: {
            warning: false,
            errors: true
        },
        // 设置代理
        port: 9001,
        proxy: {
            '/api': {
                //target: 'http://10.0.130.28:9292/',
                //target: 'http://192.168.1.54:80/',
                target: 'http://localhost:9292/',
                ws: true,
                pathRewrite: {
                    '^/api': '/'
                },
                logLevel: 'debug'
            },
			'/tycApi': {
			    target: 'http://open.api.tianyancha.com',
			    //target: 'http://192.168.1.54:80/',
                ws: true,
			    pathRewrite: {
			        '^/tycApi': '/'
			    },
                logLevel: 'debug'
			}
        }
    },
    // transpileDependencies: [
    //     /node_modules[/\\\\](element-ui|vuex|)[/\\\\]/
    // ],
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            //打包压缩gzip
            const CompressionWebpackPlugin = require('compression-webpack-plugin')
            config.plugins.push(
                new CompressionWebpackPlugin({
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + ['js', 'css', 'html'].join('|') + ')$'),
                    threshold: 1000,
                    minRatio: 1
                })
            )
			config.entry.app=["babel-polyfill","./src/main.js"]

            //打包去除console.log
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }

        //设置别名
        config.resolve.alias['@'] = path.join(__dirname, 'src')
    }
}
