/* jshint node:true */
'use strict';

module.exports = {
    module: {
        loaders: [
            {test: /\.(jsx|js)$/, loader: 'jsx-loader' },
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.jsx', 'index.jsx']
    }
};
