var ExtractTextPlugin = require('extract-text-webpack-plugin');
var dirVars = require('./base/dir-vars.config.js');

const moduleConfig = require('./inherit/module.config.js');

moduleConfig.rules.push({
    test: /\.css$/,
    exclude: /bootstrap|dll/,
    use: ExtractTextPlugin.extract([
        {
            loader: 'css-loader',
            options: {
                minimize: true,
                '-autoprefixer': true,
            },
        },
        {
            loader: 'postcss-loader',
            options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
                plugins: (loader) => [
                    require('autoprefixer')(), //CSS浏览器兼容
                ]
            }
        },
    ]),
});

moduleConfig.rules.push({
    test: /\.css$/,
    include: /bootstrap/,
    use: ExtractTextPlugin.extract([
        {
            loader: 'css-loader',
        },
    ]),
});

moduleConfig.rules.push({
    test: /\.less$/,
    include: dirVars.srcRootDir,
    use: ExtractTextPlugin.extract([
        {
            loader: 'css-loader',
            options: {
                minimize: true,
                '-autoprefixer': true,
            },
        },
        {
            loader: 'postcss-loader',
        },
        {
            loader: 'less-loader',
        },
    ]),
});

module.exports = moduleConfig;