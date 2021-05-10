// webpack公共配置
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin')
const path = require('path');
const utils = require("./utils")

module.exports = {
    // 入口
    entry: {
        app: "./src/index.tsx"
    },
    // 出口
    output: {
        path : utils.resolve("../dist"),
        filename: "js/[name].[hash].js",
        publicPath: "./" // 打包后的资源的访问路径前缀
    },
    // 模块
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
                exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
                loader: 'babel-loader',//loader的名称（必须）
            },
            {
                test: /\.(ts|tsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
                exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
                use: ['babel-loader',
                {
                    loader: 'ts-loader',
                    options: {
                      transpileOnly: true,
                      getCustomTransformers: () => ({
                        before: [tsImportPluginFactory([
                          {
                            libraryName: 'antd',
                            libraryDirectory: 'lib',
                            style: true
                          }
                        ])]
                      }),
                      compilerOptions: {
                        module: 'es2015'
                      }
                    }
                  }]
            },
            {
                test: /\.(less)$/,
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    use: [
                        {
                          loader: 'css-loader',
                          options: { sourceMap: true }
                        }, {
                          loader: 'less-loader',
                          options:  { javascriptEnabled: true, sourceMap: true }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, // url-loader 包含file-loader，这里不用file-loader, 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, // 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ],
    },
    plugins:[
        new ExtractTextWebpackPlugin({
            filename: '[name].[hash].css',
            allChunks: true,
        }), // 将css用link的方式引入html
    ],
    resolve: {
        extensions: ['.js','.jsx','.ts','.tsx'], // 解析扩展。（当我们通过路导入文件，找不到改文件时，会尝试加入这些后缀继续寻找文件）
        alias: {
            '@': path.join(__dirname, '..', "src") // 在项目中使用@符号代替src路径，导入文件路径更方便
        }
    },
    devtool: 'inline-source-map', 

}