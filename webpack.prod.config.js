// const path = require("path");
const { resolve } = require("path");
const buildPath = resolve(__dirname, "dist");

const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  devtool: "source-map",
  mode: "production",
  context: resolve(__dirname, "src"),
  entry: "./index.tsx",
  output: {
    path: buildPath,
    filename: "[name].[hash:20].js",
    publicPath: "/"
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
        test: /\.(png|jpg|pdf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/"
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts/"
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "body"
    }),
    new CleanWebpackPlugin(buildPath),
    // new FaviconsWebpackPlugin({
    //   // Your source logo
    //   logo: "/src/images/icons/favicon.png",
    //   // The prefix for all image files (might be a folder or a name)
    //   prefix: "icons-[hash]/",
    //   // Generate a cache file with control hashes and
    //   // don't rebuild the favicons until those hashes change
    //   persistentCache: true,
    //   // Inject the html into the html-webpack-plugin
    //   inject: true,
    //   background: "#fff",
    //   title: "Sauce For Your Thoughts",
    //   icons: {
    //     android: true,
    //     appleIcon: true,
    //     appleStartup: true,
    //     coast: false,
    //     favicons: true,
    //     firefox: true,
    //     opengraph: false,
    //     twitter: false,
    //     yandex: false,
    //     windows: false
    //   }
    // }),
    new UglifyJSPlugin({
      sourceMap: true,
      output: {
        comments: false
      }
    }),
    new ExtractTextPlugin("styles.[contentHash].css", {
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require("cssnano"),
      cssProcessorOptions: {
        map: {
          inline: false
        },
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    })
  ]
};
