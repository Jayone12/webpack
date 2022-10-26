# webpack
## Concepts
웹팩(webpack)은 모던 Javascript 애플리케이션을 위한 정적 모듈 번들러이다.
웹팩이 애플리케이션을 처리할 때, 내부적으로는 프로젝트에 필요한 모든 모듈을 맵핑하고 하나 이상의 번들을 생성하는 디펜더시 그래프를 만든다.
>**[디펜더시 그래프(Dependency Graph)](https://webpack.kr/concepts/dependency-graph/)**
하나의 파일이 다른 파일에 의존할 때마다, 웹팩은 이것을 의존성으로 취급한다.
이를 통해 웹팩은 이미지 또는 웹 폰트와 같은 코드가 아닌 애셋을 가져와, 애플리케이션에 의존성을 제공할 수 있다.

>웹팩 버전 4.0.0 이후로는 프로젝트를 번들링하기 위한 설정 파일을 필요로 하지 않지만 사용자 요구에 따라 기대 이상으로 유연하게 설정 가능하다.

### Entry
엔트리(Entry)포인트는 webpack이 내부의 [디펜더시 그래프](https://webpack.kr/concepts/dependency-graph/)를 생성하기 위해 사용해야 하는 모듈이다. 웹팩은 엔트리 포인트가 (직간접적으로)의존하는 다른 모듈과 라이브러리를 찾는다.

```javascript
// webpack.config.js
module.exports = {
  // 파일을 읽어들이기 시작하는 진입점 설정
	entry: './path/to/my/entry/file.js',
}
```

### Output
생성된 번들을 내보낼 위치와 이 파일의 이름을 지정하는 방법을 웹팩에 알려주는 역할로 기본 출력 파일의 경우에는 ./dist/main.js로, 생성된 기타 파일의 경우에는 ./dist 폴더로 설정된다.

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    // node에서 필요로하는 절대경로
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
};
```
- output.path
번들을 내보내기할 경로를 지정한다.
이 때 core Node.js에서 사용되는 모듈로 경로를 지정해야한다.
- output.filename
번들 내보내기 했을 때의 파일명을 지정한다.

### Loaders
웹팩은 기본적으로 자바스크립트와 JSON 파일만 이해하며, Loader를 사용하면 웹팩이 다른 유형의 파일을 처리하거나, 그들을 유요한 모듈로 변환하여 애플리케이션에서 사용하거나 디펜던시 그래프에 추가한다.
>❗️ 웹팩의 특정 기능 중 하나인 모든 유형의 모듈(예:`.css`)을 `Import`하는 기능은 다른 번들러나 태스크 러너에서 지원하지 않을 수 있다.

상위 수준에서 Loader는 웹팩 설정에 두 가지 속성을 가진다.
1. 변환이 필요한 파일(들)을 식별하는 `test`속성
2. 변환을 수행하는데 사용되는 로더를 가르키는 `use`속성

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    // test와 use라를 두 가지 필수 속성을 가진 하나의 모듈을 위해 rules 속성을 정의
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
```
위 rules의 내용을 해석하면 웹팩이 변환할 때 `require() / import`문 내에 `.txt`파일이 존재하는 경로를 발견하면 번들에 추가하기 전에 `raw-loader`를 사용하여 변환한다.

>❗️ 주의 사항
>- 웹팩 설정에서 규칙을 정의할 때 rules가 아닌 module.rules 아래에 정의해야 한다.
>- 정규식을 사용하여 파일을 매칭할 때 따옴표를 사용하지 않도록 주의해야한다.
>    - `/\.txt$/`는 웹팩에 .txt로 끝나는 모든 파일과 일치하도록 하는 것
>    - `'/\.txt$'` 또는 `"/\.txt$"`는 절대 경로 `'.txt'`를 가진 파일과 일치하도록 하는 것이다.
    
### plugins
Loader는 특정 유형의 모듈을 변하는데 사용했다면, Plugins은 번들을 최적화 하거나, asset을 관리하고, 또 환경 변수 주입등과 같은 광범위한 작업을 수행 할 수 있다.

```javascript
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 내장 plugin에 접근하는 데 사용

module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  // 생성된 모든 번들을 자동으로 삽입하여 애플리케이션용 HTML 파일을 생성하는 모듈
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```
플러그인을 사용하려면 `require()`를 통해 플러그인을 요청하고 플로그인 배열에 추가해야한다. 대부분의 플로그인은 옵션을 통해 사용자가 지정 가능하며, 다른 목적으로 플러그인을 여러 번 사용하도록 설정할 수 있으므로 `new` 연산자로 호출하여 플러그인의 인스턴스를 만들어야 한다.

### Mode
Mode 파라미터를 `development`, `production` 또는 `none`으로 설정하면 웹팩에 내장된 환경별 최적화를 활성화 할 수 있으며 기본값은 `production`이다.

```javascript
// webpack.config.js
module.exports = {
  mode: 'production',
};
```

|옵션|설명|
|--|--|
|development|`DefinePlugin`의 `process.env.NODE_ENV`를 `development`로 설정한다. 모듈과 청크에 유용한 이름을 사용할 수 있다.|
|production|`DefinePlugin`의 `process.env.NODE_ENV`를 `production`으로 설정한다. 모듈과 청크, `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `TerserPlugin` 등에 대해 결정적 망글이름(mangled name)을 사용할 수 있습니다.|
|none|기본 최적화 옵션에서 제외|

### Browser Compatibility
웹팩은 `ES5`가 호환되는 모든 브라우저를 지원한다.(IE8 이하는 ❌)
`import()` 또는 `require.,ensure()`를 위한 Promise를 요구하며 구형 브라우저를 지원하기 위해서는 폴리필을 로드해야한다.

>**폴리필(Polyfill)**
>폴리필(polyfill)은 웹 개발에서 기능을 지원하지 않는 웹 브라우저 상의 기능을 구현하는 코드로 기능을 지원하지 않는 웹 브라우저에서 원하는 기능을 구현할 수 있으나, 폴리필 플러그인 로드 때문에 시간과 트>래픽이 늘어나고, 브라우저별 기능을 추가하는 것 때문에 코드가 매우 길어지고, 성능이 많이 저하된다는 단점이 있다.
>- 출처 - [위키피디아](https://ko.wikipedia.org/wiki/%ED%8F%B4%EB%A6%AC%ED%95%84_(%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D))


## 참고 자료
- [webpack](https://webpack.kr/concepts/)
- [위키피디아](https://ko.wikipedia.org/wiki/%ED%8F%B4%EB%A6%AC%ED%95%84_(%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D))
