const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: "./src/index.js",
  output: {
    // 번들링 완료 후 내보낼 파일 명
    filename: "main.js",
    // 내보내기 할 위치
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 번들에 같이 사용할 html 경로
      template: "./index.html",
    }),
  ],
};
