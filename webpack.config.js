const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  output: {
    filename: "app.bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [["@babel/plugin-transform-runtime"]],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{ loader: "url-loader" }],
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
