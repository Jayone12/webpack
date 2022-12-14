const path = require("path");

module.exports = {
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: "./src/index.js",
  output: {
    // 번들링 완료 후 내보낼 파일 명
    filename: "main.js",
    // 내보내기 할 위치
    path: path.resolve(__dirname, "dist"),
  },
};
