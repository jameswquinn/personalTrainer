const webpack = require("webpack");
const path = require("path");

/**
 *
 * We've added WebpackBuildNotifierPlugin plugin. This uses the
 * node-notifier module to display OS-level notifications for
 * Webpack build errors and warnings.
 *
 * https://github.com/RoccoC/webpack-build-notifier
 *
 */

const WebpackBuildNotifierPlugin = require("webpack-build-notifier");

/**
 *
 * We.ve added PurgecssPlugin plugin to remove unused css.
 *
 * https://github.com/FullHuman/purgecss-webpack-plugin
 *
 */

const glob = require("glob");
const PurgecssPlugin = require("purgecss-webpack-plugin");

/**
 * webpack-pwa-manifest is a webpack plugin that generates
 * a 'manifest.json' for your Progressive Web Application, with
 * auto icon resizing and fingerprinting support.
 *
 * https://github.com/arthurbergmz/webpack-pwa-manifest
 *
 */

const WebpackPwaManifest = require("webpack-pwa-manifest");
/**
 * We've enabled Postcss, autoprefixer and precss for you. This allows your app
 * to lint  CSS, support variables and mixins, transpile future CSS syntax,
 * inline images, and more!
 *
 * To enable SASS or LESS, add the respective loaders to module.rules
 *
 * https://github.com/postcss/postcss
 *
 * https://github.com/postcss/autoprefixer
 *
 * https://github.com/jonathantneal/precss
 *
 */

const autoprefixer = require("autoprefixer");
const precss = require("precss");

/**
 * We've enabled TerserPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 */

const TerserPlugin = require("terser-webpack-plugin");

/**
 *
 * This plugin compresses assets with Brotli
 * compression algorithm.
 *
 * https://github.com/mynameiswhm/brotli-webpack-plugin
 *
 */

const BrotliPlugin = require("brotli-webpack-plugin");

/**
 *
 * This plugin compresses assets with gzip compression
 * algorithm as 'fallback' position.
 *
 * https://github.com/webpack-contrib/compression-webpack-plugin
 *
 */

const Critters = require("critters-webpack-plugin");

/**
 *
 * Prints the gzipped sizes of your webpack assets and
 * the changes since the last build.
 *
 * https://github.com/GoogleChromeLabs/size-plugin
 *
 */

const SizePlugin = require("size-plugin");

/**
 *
 * The GenerateSW plugin will create a service worker file
 * for you and add it to the webpack asset pipeline.
 *
 * https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
 *
 */

const { GenerateSW } = require("workbox-webpack-plugin");

/**
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/**
 *
 * A webpack plugin to remove/clean your build folder(s).
 *
 * https://github.com/johnagan/clean-webpack-plugin
 *
 */

const CleanWebpackPlugin = require("clean-webpack-plugin");

const DirectoryTreePlugin = require("directory-tree-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

/**
 *
 * We've added BundleAnalyzerPlugin to represent bundle
 * content as convenient interactive zoomable treemap
 *
 * https://github.com/webpack-contrib/webpack-bundle-analyzer
 *
 */

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  entry: {
    bundle: ["./src/index"]
  },
  resolve: {
    extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
    mainFields: ["browser", "module", "main"],
    alias: {
      react: "preact-compat",
      "react-dom": "preact-compat",
      // Not necessary unless you consume a module using `createClass`
      "create-react-class": "preact-compat/lib/create-react-class",
      // Not necessary unless you consume a module requiring `react-dom-factories`
      "react-dom-factories": "preact-compat/lib/react-dom-factories"
    }
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]~[contentHash].js",
    chunkFilename: "[name]~[contentHash].[id].js"
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [precss, autoprefixer];
              },
              sourceMap: false
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              experimentalWatchApi: true
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false,
                    targets: [
                      "last 1 version",
                      "> 1%",
                      "maintained node versions",
                      "not dead"
                    ]
                  }
                ]
              ],
              plugins: [
                [
                  "transform-react-jsx",
                  {
                    pragma: "h"
                  }
                ]
              ]
            }
          }
        ]
      },
      /**
       * We've added 'responsive-loader', a webpack loader for responsive images.
       * It creates multiple images from one source image,
       * and returns a srcset.
       *
       * https://github.com/herrstucki/responsive-loader
       *
       * @example `const responsiveImage = require("example.jpg?min=320,max=1400,steps=6");`
       *
       *
       */
      {
        test: /\.(jpe?g|png)$/i,
        loader: "responsive-loader",
        options: {
          adapter: require("responsive-loader/sharp"),
          format: "jpg",
          quality: 70,
          name: "[name]~[sha512:hash:base64:7].[ext]",
          outputPath: "imgs"
        }
      },
      {
        test: /\.svg$/,
        use: [
          { loader: "file-loader" },
          {
            loader: "svgo-loader",
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false }
              ]
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name]~[sha512:hash:base64:7].[ext]",
            outputPath: "fonts"
          }
        }
      },
      {
        test: /\.mp4$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "videos"
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      template: "!!prerender-loader?string!public/index.html",
      meta: {
        description: "Description website",
        author: "A N Other",
        keywords: "website, with, meta, tags",
        robots: "index, follow",
        "revisit-after": "5 month",
        image: ""
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true
      }
    }),
    new WebpackPwaManifest({
      //filename: "manifest.json",
      name: "My Progressive Web App",
      short_name: "MyPWA",
      description: "My awesome Progressive Web App!",
      background_color: "#000000",
      theme_color: "#000000",
      orientation: "portrait",
      display: "fullscreen",
      start_url: ".",
      crossorigin: null,
      inject: false,
      fingerprints: false,
      ios: true,
      publicPath: null,
      includeDirectory: true,
      icons: [
        {
          src: path.resolve("public/icons/icon.png"),
          sizes: [16, 32, 57, 60, 72, 76, 114, 120, 144, 152, 167, 180] // multiple sizes
        },
        {
          src: path.resolve("public/icons/icon.png"),
          size: "1024x1024" // you can also use the specifications pattern
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "[name]~[contentHash].css"
    }),
    new PurgecssPlugin({
      paths: glob.sync(path.join(__dirname, "src/**/*"), { nodir: true })
    }),
    new Critters(),
    new OptimizeCssAssetsPlugin(),
    new TerserPlugin({
      cache: true,
      parallel: true,
      extractComments: true,
      sourceMap: true // Must be set to true if using source-maps in production
    }),
    new BrotliPlugin({
      asset: "[path].br[query]",
      test: /\.js$|\.css$|\.svg$|\.html$/,
      threshold: 10240,
      minRatio: 0.7
    }),
    new SizePlugin(),
    new GenerateSW({
      swDest: "service-worker.js",
      skipWaiting: true,
      clientsClaim: true,
      navigateFallback: "index.html"
    }),
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build",
      logo: path.resolve("public/icons/icon.png"),
      suppressSuccess: true
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static"
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      },
      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  }
};
