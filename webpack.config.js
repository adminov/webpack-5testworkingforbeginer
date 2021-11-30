const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let mode = 'development';
if (process.env.NODE_ENV === 'production') {
    mode = 'production';
}

module.exports = {
    mode: mode,
    //ENTRY POINTS. Импорт нескольких файлов.
    entry: {
        scripts: "./src/index.js",
        user: "./src/user.js",
    },
    output: {
        filename: "[name].[contenthash].js",
        assetModuleFilename: "assets/[hash][ext][query]",
        clean: true,
    },
    //DEV-TOOL настройка исходных карт
    devtool: "source-map",
    //OPTIMIZATION. Разделение файлов
    optimization: {
        splitChunks: {
            chunks: "all",
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.pug"
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            //Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
            {
                //Подключение шаблонизатор
                //html2jade.org - this redactor html to pug
                //webpack.config.js в plugins -> template написать index.pug
                //создать папка pug -> libs и в нем созать файлы _image.pug _libs.pug
                // в папке libs создать файл _head.pug
                // в папке src создать файл index.pug
                test: /\.pug$/,
                loader: 'pug-loader',
                exclude: /(node_modules|bower-components)/,
            },
            //javaScript
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
};