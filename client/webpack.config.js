const webpack = require("webpack");

module.export = {
    plugins: [
        new webpack.DefinePlugin({
            REACT_APP_BASE_URL: JSON.stringify(process.env.REACT_APP_BASE_URL)
        })
    ]
};
