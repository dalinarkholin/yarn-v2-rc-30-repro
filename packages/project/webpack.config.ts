import * as path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

import {
  devtool,
  entry,
  mode,
  node,
  optimization,
  output,
  plugins,
  resolve,
  webpackModule,
} from "../config/src/webpack/webpack.common";

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const PnpWebpackPlugin = require("pnp-webpack-plugin");
interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const environment = process.env.NODE_ENV ? process.env.NODE_ENV! : "development";

const config: Configuration = {
  entry,
  mode,
  output,
  devtool,
  resolve,
  plugins,
  node,
  module: webpackModule,
  optimization: optimization as any,
};

if (environment === "development") {
  config.mode = "development";
  config.plugins = [
    ...plugins,
    new ForkTsCheckerWebpackPlugin({
      eslint: true,
      tsconfig: path.resolve("tsconfig.json"),
      useTypescriptIncrementalApi: false,
      measureCompilationTime: true,
      async: true,
    }),
  ];
  config.devServer = {
    contentBase: "dist",
    historyApiFallback: true,
    hot: true,
    stats: "normal",
    inline: true,
    overlay: true,
    disableHostCheck: true,
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8000,
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 1000,
      ignored: [/node_modules/, /dist/],
    },
  } as Configuration;
}

module.exports = {
  ...config,
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
};
