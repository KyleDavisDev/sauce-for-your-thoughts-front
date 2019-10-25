// const path = require("path");
const { resolve } = require("path");
const buildPath = resolve(__dirname, "dist");

const AppManifestWebpackPlugin = require("app-manifest-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
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
      // process any .js files if found.
      {
        test: /\.m?js$/,
        exclude: /(bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
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
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: "body"
    }),
    // favicons
    new AppManifestWebpackPlugin({
      // Your source logo
      logo: "./images/icons/favicon.png",
      // Prefix for file names
      prefix: "/assets/icons/", // default '/'
      // Output path for icons (icons will be saved to output.path(webpack config) + this key)
      output: "/icons-[hash:8]/", // default '/'. Can be absolute or relative
      statsFilename: "iconstats.json",
      persistentCache: false,
      config: {
        path: "/static/assets/"
      }
    }),

    new CleanWebpackPlugin(buildPath),

    // new ExtractTextPlugin("styles.[contentHash].css", {
    //   allChunks: true
    // }),
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
