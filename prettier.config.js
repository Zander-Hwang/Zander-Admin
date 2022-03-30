module.exports = {
  // 超过最大值换行
  printWidth: 100,
  // 缩进字节数
  tabWidth: 2,
  // 缩进使用tab，不使用空格
  useTabs: false,
  // 句尾添加分号
  semi: true,
  vueIndentScriptAndStyle: true,
  // 使用单引号代替双引号
  singleQuote: true,
  // 对象属性的引号使用
  quoteProps: 'as-needed',
  // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  bracketSpacing: true,
  // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  trailingComma: 'es5',
  // 在jsx中把'>' 是否单独放一行
  jsxBracketSameLine: false,
  // 在jsx中使用单引号代替双引号
  jsxSingleQuote: false,
  // 箭头函数中的括号
  arrowParens: 'avoid',
  insertPragma: false,
  requirePragma: false,
  // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  proseWrap: 'never',
  htmlWhitespaceSensitivity: 'strict',
  // 结尾是 \n \r \n\r auto
  endOfLine: 'lf',
};
