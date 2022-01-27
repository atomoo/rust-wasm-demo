const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const dist = path.resolve(__dirname, "dist");

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
console.log('mode:', mode);
module.exports = {
    mode,
    context: path.resolve(__dirname),
    entry: {
        index: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: dist,
        filename: "[name].js"
    },
    devServer: {
        compress: true,
        client: {
            overlay: {
                errors: true,
                warnings: false
            }
        },
        watchFiles: {
            paths: ['src/**/*', 'pkg/**/*']
        }
    },
    module: {
        rules: [
            {
                test: /\.wasm$/,
                type: "webassembly/async"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'demo'
        }),

        new WasmPackPlugin({
            crateDirectory: __dirname,
            watchDirectories: [
                path.resolve(__dirname, 'wasm')
            ],
            // outDir: path.resolve(__dirname, 'src/pkg'),
            forceMode: mode
        }),
    ],
    experiments: {
        asyncWebAssembly: true
    }
};
