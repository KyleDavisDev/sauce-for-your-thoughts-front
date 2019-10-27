const { resolve } = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  mode: "development",
  context: resolve(__dirname, "src"),
  entry: [
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    "webpack/hot/only-dev-server",
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    "webpack-dev-server/client?http://localhost:8080",
    // the entry point of our app
    "./index.tsx"
  ],
  output: {
    path: resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: "/"
  },
  devtool: "inline-source-map",
  devServer: {
    // Port
    port: 8080,
    // Enables Hot reloading
    hot: true,
    // Minimize the output to terminal.
    noInfo: true,
    quiet: false,
    // Match output
    contentBase: resolve(__dirname, "src"),
    publicPath: "/",
    // What is this?
    historyApiFallback: { disableDotRule: true }
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(ts|tsx)?$/,
        loader: "tslint-loader",
        exclude: [resolve(__dirname, "node_modules")]
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              compilerOptions: {
                module: "es2015"
              }
            }
          }
        ],
        exclude: [resolve(__dirname, "node_modules")]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(png|jpg|pdf|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/"
          }
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts/"
          }
        }
      },
      // load any svgs
      {
        test: /\.(svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              outputPath: "images/"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: resolve(__dirname, "src/index.html"),
      filename: "index.html",
      inject: "body"
    }),
    new OpenBrowserPlugin({ url: "http://localhost:8080" })
    //   new ExtractTextPlugin("styles.css")
  ]
};
