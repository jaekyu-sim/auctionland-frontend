// webpack.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const DotenvWebpackPlugin = require('dotenv-webpack');
//const dotenv = require('dotenv');
//dotenv.config();
//console.log("test : ", process)


module.exports = {
    mode: process.env.mode,
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[hash].js',
      publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: '/node_modules/',
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader', 
                    },
                    {
                        loader: 'css-loader', 
                    },
                ]
            },
            {
                test:/\.(jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    publicPath: './dist/',
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            //dist 폴더를 삭제 및 정리해주는 Plugin
            cleanAfterEveryBuildPatterns: ['**/*.LICENSE.txt'],
            protectWebpackAssets: false
        }),
        new HtmlWebpackPlugin({
            //webpack이 html 파일을 읽어서 html 파일을 빌드하도록 해줌
            //template 에는 번들링 하고자 하는 html 파일의 경로와 이름.
            //filenmae 에는 버들ㄹ이 결과 새롭게 생성되는 파일의 경로와 이름. dist 폴더 하위 경로부터 적으면 됨.
            template: './public/index.html'
        }),
        new webpack.BannerPlugin(
            'Banner Plugin 에 의해 입력되는 내용입니다.'
        ),
        new webpack.DefinePlugin({
            //여기엔, 어플리케이션단에서 환경변수 용도로 사용할 변수 값을 정의하여 사용할 수 있음.
            //ex) 
            /*
            - webpack.config.js -

            webpack.DefinePlugin({
                TESTVALUE : 1+1
            })

            - 실제 사용하는 곳에서 console.log 출력 -
            console.log(TESTVALUE)
            //마치 process.env 안의 값 처럼, 어플리케이션 전체 범위에서 전역변수 처럼 사용 가능.
            */
        }),
        new DotenvWebpackPlugin(),
        
    ],
    devServer: {
        host: 'localhost',
        port: 3000,
        hot: true,
        open: true,
        proxy:{
            "/api":'http://localhost:8080',
            changeOrigin:true
        }
    }
};