// Paths in this file are relative to the webpack.config that extends this one.

import * as path from "path";
import {
  HotModuleReplacementPlugin,
  Module,
  NamedModulesPlugin,
  Node,
  NoEmitOnErrorsPlugin,
  Output,
  Plugin,
  Resolve,
} from "webpack";

import babelConfig from "../babelrc.config";

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PnpWebpackPlugin = require("pnp-webpack-plugin");
const environment = process.env.NODE_ENV ? process.env.NODE_ENV! : "development";

export const webpackModule: Module = {
  rules: [
    {
      test: /\.tsx?$/,
      loader: "babel-loader",
      options: babelConfig,
      exclude: /node_modules/,
      enforce: "pre",
      sideEffects: false,
    },
    {
      test: /\.html$/,
      exclude: /node_modules/,
      loader: "html-loader",
    },
    {
      test: /\.(jpg|png|svg)$/,
      exclude: /node_modules/,
      loader: "file-loader",
      options: {
        filename: "img-[hash].[ext]",
      },
    },
    {
      test: /plugin\.css$/,
      loaders: ["style-loader", "css-loader"],
    },
  ],
};

export const optimization = {
  usedExports: true,
  sideEffects: true,
  removeAvailableModules: true,
  removeEmptyChunks: true,
  namedChunks: true,
  namedModules: true,
  runtimeChunk: "multiple" as any,
  concatenateModules: false, // need this for yarn v2
};

export const output: Output = {
  path: path.resolve(".", "dist"),
  publicPath: "/",
  filename: "scripts/[id]-[hash].js",
  chunkFilename: "scripts/[id]-[hash].js",
  pathinfo: false,
};

export const PATHS = {
  src: path.join("src"),
  images: path.join("..", "assets", "src", "images"),
  javascript: path.join("..", "assets", "src", "javascript"),
  css: path.join("..", "assets", "src", "css"),
};

export const entry: string[] = ["./src/index.tsx"];

export const mode = "none";
export const devtool = environment === "development" ? "source-map" : "inline-cheap-module-source-map";

export const resolve: Resolve = {
  extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".config"],
  plugins: [PnpWebpackPlugin],
  symlinks: false,
};

export const plugins: Plugin[] = [
  new NamedModulesPlugin(),
  new HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: "src/index.html",
    inject: true,
  }),
  new NoEmitOnErrorsPlugin(),
];

export const node: Node = {
  fs: "empty",
};
