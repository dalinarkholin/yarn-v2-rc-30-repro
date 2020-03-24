const babelConfig = {
  cacheDirectory: true,
  presets: [
    "@babel/preset-typescript",
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: 3,
        targets: ["last 2 versions", "> 0.25%", "not dead", "ie 11"],
        modules: false,
      },
    ],
  ],
  plugins: [
    ["@babel/plugin-transform-typescript"],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-proposal-object-rest-spread",
      {
        useBuiltIns: true,
      },
    ],
    [
      "babel-plugin-transform-imports",
      {
        "@material-ui/core": {
          // Use "transform: "@material-ui/core/${member}"," if your bundler does not support ES modules
          transform: "@material-ui/core/esm/${member}",
          preventFullImport: true,
        },
        "@material-ui/icons": {
          // Use "transform: "@material-ui/icons/${member}"," if your bundler does not support ES modules
          transform: "@material-ui/icons/esm/${member}",
          preventFullImport: true,
        },
      },
    ],
  ],
};

export default babelConfig;
