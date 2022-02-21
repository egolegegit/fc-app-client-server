import webpack from "webpack";

module.export = {
    plugins: [
        new webpack.DefinePlugin({
            "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL)
        })
    ]
};
