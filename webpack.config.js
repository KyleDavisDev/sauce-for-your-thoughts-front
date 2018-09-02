const { resolve } = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  mode: "development",
  context: resolve(__dirname, "src"),
  entry: [
    "webpack-dev-server/client?http://localhost:8080",
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    "webpack/hot/only-dev-server",
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    "./src/index.tsx"
    // the entry point of our app
  ],
  output: {
    path: resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: "/"
  },
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
  devtool: "inline-source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              // getCustomTransformers: () => ({
              //   before: [
              //     tsImportPluginFactory({
              //       libraryName: "antd",
              //       libraryDirectory: "es",
              //       style: "css"
              //     })
              //   ]
              // }),
              compilerOptions: {
                module: "es2015"
              }
            }
          }
        ],
        exclude: [resolve(__dirname, "node_modules")]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: "babel-loader"
      //   }
      // },
      // {
      //   test: /\.(png|jpg|pdf)$/,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       name: "[name].[ext]",
      //       outputPath: "images/"
      //     }
      //   }
      // },
      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: ["css-loader", "resolve-url-loader", "sass-loader?sourceMap"],
      //     publicPath: "/"
      //   })
      // },
      // {
      //   test: /\.(eot|svg|ttf|woff|woff2)$/,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       name: "[name].[ext]",
      //       outputPath: "fonts/"
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "body"
    })
    //   new ExtractTextPlugin("styles.css")
  ]
};
