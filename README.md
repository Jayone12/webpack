# webpack 번들 시작해보기

해당 내용응 웹팩 공식 문서의 Getting Started 문서를 보고 작성했습니다.

## 폴더 구조

```
root
  |- /src
    |- index.js
  |- index.html
  |- webpack.config.js
  |- package.json
  |- package-lock.json
```

## 번들 시작하기

웹팩을 사용하기 위해 먼저 `webpack.config.js`를 생성한다.

```javascript
// webpack.config.js
// node 환경에서의 path 모듈을 사용한다.
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
```

여기서 번들할때 js파일이 아닌 html파일도 같이 진행해야 하기 떄문에 plugins에 추가할 패키지가 있는데 바로 [`html-webpack-plugin`](https://github.com/jantimon/html-webpack-plugin)을 설치한다.

```bash
npm i --save-dev html-webpack-plugin
```

해당 패키지를 설치 한후 webpack.config.js에 plugins에 추가한다.

```javascript
const path = require("path");
// 모듈을 불러온다.
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
  plugins: [
    new HtmlWebpackPlugin({
      // 번들에 같이 사용할 html 파일명
      template: "./index.html",
    }),
  ],
};
```

## js 파일 작성

```javascript
function component() {
  const element = document.createElement("div");

  element.innerText = "hello world";

  return element;
}

document.body.appendChild(component());
```

## 번들 시작

위와 같은 준비를 완료한 후 터미널에 아래와 같이 입력하여 실행한다.

```bash
npx webpack --config webpack.config.js
```

위와 같이 입력하면 번들이 시작되고 완료되면 `root 폴더`에 `dist 폴더`가 생성되며 번들된 파일들이 생성된다.

이 때 다른 방법으로는 package.json에서의 script 부분을 추가해주는 방법이 있다.

```JSON
  "scripts": {
    "build": "webpack"
  },
```

위와 같이 추가한 후 터미널에서 `npm run build`를 하면 실행된다.
