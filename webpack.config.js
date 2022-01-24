const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const dist = path.resolve(__dirname, "dist");

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: dist,
        filename: "[name].js"
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                path.resolve(__dirname, "static")
            ]
        }),

        new WasmPackPlugin({
            crateDirectory: __dirname,
            watchDirectories: [
                path.resolve(__dirname, 'wasm')
            ],
        }),
    ],
    experiments: {
        syncWebAssembly: true
    }
};
