const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// paths
const projectPath = path.resolve(__dirname, '..');
const buildPath = path.join(projectPath, 'build');
const srcPath = path.join(projectPath, 'src');

const config = {
    entry: path.join(srcPath, 'index.js'),
    output: {
        filename: 'bundle.js',
        path: buildPath
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: srcPath,
                loader: 'babel-loader',
                options: {
                    presets: [['es2015', {'modules': false}], "react"]
                }
            }/*,
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: ...
                        }
                    },
                    'sass-loader'
                ]
            }*/
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html')
        })
    ],
    devtool: "cheap-eval-source-map"
};

module.exports = config;