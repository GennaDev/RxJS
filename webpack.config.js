const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        app: './js/scrypt.js', // Указываем путь к вашему текущему js файлу
        counter: './counter.js' // Добавляем новую точку входа для счетчика
    },
    devtool: "eval-source-map",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
