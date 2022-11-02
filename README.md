# Asset Management

asset을 통합하고 처리되는 방법을 공부
웹팩은 내장 asset module을 지원하며, 다른 유형의 파일도 포함할 수 있다.

## Loading CSS

자바스크립트 모듈 내에서 css 파일을 import하려면 아래와 같은 Loader 패키지가 필요하며, 이를 module 설정이 필요하다.

```bash
npm i -d style-loader css-loader
```

```javascript
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: "./src/index.js",f
  output: {
    // 번들링 완료 후 내보낼 파일 명
    filename: "main.js",
    // 내보내기 할 위치
    path: path.resolve(__dirname, "dist"),
  },
  // 모듈 내 rules 추가
  module: {
    rules: [
      {
        // 정규식 표현으로 .css로 끝나는 파일을 찾는다.
        test: /\.css$/i,
        // 위에서 찾은 파일은 아래의 Loader를 사용하여 번들한다.
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
```

정규식 표현을 사용하여 .css로 끝나는 파일만 찾고, 모듈을 사용하여 해당 파일은 변형한다.
모듈의 로더는 체인으로 연결할 수 있다. 이 때 체인의 각 로더는 리소스에 변형을 적용하며 역순으로 실행된다.
위 내용을 보자면 css-loader로 css 파일을 읽은 후 style-loader로 style을 읽는다.

src 폴더내 style.css를 생성한 후 css를 작성한다.

```css
.hello {
  color: red;
}
```

다음 해당 css로 번들 대상이므로 `index.js`에 css를 `import` 한다.

```javascript
// index.js
// style.css를 import 한다.
import "./style.css";

function component() {
  const element = document.createElement("div");

  // 이 라인이 동작하려면 현재 스크립트를 통해 포함된 Lodash가 필요합니다.
  element.innerText = "hello world";
  // element에 class를 추가한다.
  element.classList.add("hello");

  return element;
}

document.body.appendChild(component());
```

위와 같이 작성한 후 `npm run build`를 실행하여 번들한다.
