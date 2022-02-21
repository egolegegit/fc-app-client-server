import webpack from "webpack";

module.export = {
    plugins: [
        new webpack.DefinePlugin({
            BASE_URL: JSON.stringify(process.env.BASE_URL)
        })
    ]
};
