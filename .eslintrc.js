module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '*.vue'],
      rules: {
        indent: 'off',
      },
      env: {
        mocha: true,
      },
    },
  ],
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],

  plugins: ['flowtype', '@typescript-eslint'],

  /**
   * 下面这些rules是用来设置从插件来的规范代码的规则。
   * 主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致。
   * "off" -> 0 关闭规则
   * "warn" -> 1 开启警告规则
   * "error" -> 2 开启错误规则
   */
  rules: {
    // 不需要
    'space-before-function-paren': 0, // 函数定义时括号前面要不要有空格
    'eol-last': 0, // 文件以单一的换行符结束
    'no-extra-semi': 0, // 可以多余的冒号
    semi: 0, // 语句可以不需要分号结尾
    eqeqeq: 0, // 必须使用全等
    'one-var': 0, // 连续声明
    'no-undef': 0, // 可以 有未定义的变量
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/ban-ts-ignore': 'off', // 禁止使用@ts-ignore来消除ESLint检查
    '@typescript-eslint/explicit-function-return-type': 'off', // 在函数和类方法上需要显式的返回类型
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用any类型
    '@typescript-eslint/no-var-requires': 'off', // 除导入语句外，禁止使用require语句
    '@typescript-eslint/no-empty-function': 'off', // 禁止使用空函数
    'vue/custom-event-name-casing': 'off', // 对自定义事件名称强制使用特定的大小写
    '@typescript-eslint/no-use-before-define': 'off', // 在定义变量之前不允许使用变量
    '@typescript-eslint/ban-ts-comment': 'off', // 禁止使用@ts-注解
    '@typescript-eslint/ban-types': 'off', // 禁止使用特定类型
    '@typescript-eslint/no-non-null-assertion': 'off', // 禁止使用!后缀运算符进行非null断言
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 在导出的函数和类的公共类方法上需要显式的返回值和参数类型
    // ↓禁止使用未使用的变量
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^h$',
        varsIgnorePattern: '^h$',
      },
    ],
    // ↓禁止使用未使用的变量
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^h$',
        varsIgnorePattern: '^h$',
      },
    ],
    // 关闭驼峰命名规则
    'vue/multi-word-component-names': 'off',
    // ↓强制属性顺序
    'vue/attributes-order': 'off',
    // ↓强制每个组件应位于其自己的文件中
    'vue/one-component-per-file': 'off',
    // ↓在标签的右括号之前要求或不允许换行
    'vue/html-closing-bracket-newline': 'off',
    // ↓强制每行的最大属性数
    'vue/max-attributes-per-line': 'off',
    // ↓在多行元素的内容之前和之后需要换行
    'vue/multiline-html-element-content-newline': 'off',
    // ↓在单行元素的内容之前和之后需要换行
    'vue/singleline-html-element-content-newline': 'off',
    // ↓在模板中的自定义组件上实施属性命名样式
    'vue/attribute-hyphenation': 'off',
    // ↓需要道具的默认值
    'vue/require-default-prop': 'off',
    // ↓实施自我封闭的风格
    // 'vue/html-self-closing': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],

    // 警告
    'no-extra-boolean-cast': 1, // 不必要的bool转换
    'no-extra-parens': 0, // 非必要的括号
    'no-empty': 1, // 块语句中的内容不能为空
    'no-use-before-define': [1, 'nofunc'], // 未定义前不能使用
    complexity: [1, 10], // 循环复杂度

    // vue
    'vue/require-v-for-key': 0,
    'flowtype/define-flow-type': 1,
    'flowtype/use-flow-type': 1,

    // 错误
    'comma-dangle': ['error', 'only-multiline'], // 对象字面量项尾不能有逗号
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 禁止使用debugger
    'no-constant-condition': 2, // 禁止在条件中使用常量表达式 if(true) if(1)
    'no-dupe-args': 2, // 函数参数不能重复
    'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-duplicate-case': 2, // switch中的case标签不能重复
    'no-empty-character-class': 2, // 正则表达式中的[]内容不能为空
    'no-invalid-regexp': 2, // 禁止无效的正则表达式
    'no-func-assign': 2, // 禁止重复的函数声明
    'valid-typeof': 2, // 必须使用合法的typeof的值
    'no-unreachable': 2, // 不能有无法执行的代码
    'no-unexpected-multiline': 2, // 避免多行表达式
    'no-sparse-arrays': 2, // 禁止稀疏数组， [1,,2]
    'no-shadow-restricted-names': 2, // 严格模式中规定的限制标识符不能作为声明时的变量名使用
    'no-cond-assign': 2, // 禁止在条件表达式中使用赋值语句
    'no-native-reassign': 2, // 不能重写native对象

    // 代码风格
    indent: [2, 2, { SwitchCase: 1, flatTernaryExpressions: false }], // 两个空格的缩进
    'vue/script-indent': [
      2,
      2,
      {
        // script标签缩进设置
        baseIndent: 1,
        switchCase: 1,
        ignores: [],
      },
    ],
    quotes: [0, 'single'], // js必须使用单引号
    'no-else-return': 1, // 如果if语句里面有return,后面不能跟else语句
    'no-multi-spaces': 1, // 不能用多余的空格
    'key-spacing': [
      1,
      {
        beforeColon: false,
        afterColon: true,
      },
    ], // 对象字面量中冒号的前后空格
    'block-scoped-var': 2, // 块语句中使用var
    'consistent-return': 2, // return 后面是否允许省略
    'accessor-pairs': 2, // 在对象中使用getter/setter
    'dot-location': [2, 'property'], // 对象访问符的位置，换行的时候在行首还是行尾
    'no-lone-blocks': 2, // 禁止不必要的嵌套块
    'no-labels': 2, // 禁止标签声明
    'no-extend-native': 2, // 禁止扩展native对象
    'no-floating-decimal': 2, // 禁止省略浮点数中的0 .5 3.
    'no-loop-func': 2, // 禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）
    'no-new-func': 2, // 禁止使用new Function
    'no-self-compare': 2, // 不能比较自身
    'no-sequences': 2, // 禁止使用逗号运算符
    'no-throw-literal': 2, // 禁止抛出字面量错误 throw "error";
    'no-return-assign': [2, 'always'], // return 语句中不能有赋值表达式
    'no-redeclare': [
      2,
      {
        builtinGlobals: true,
      },
    ], // 禁止重复声明变量
    'no-unused-expressions': [
      2,
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ], // 禁止无用的表达式
    'no-useless-call': 2, // 禁止不必要的call和apply
    'no-useless-concat': 2,
    'no-void': 2, // 禁用void操作符
    'no-with': 2, // 禁用with
    'space-infix-ops': 2, // 中缀操作符周围要不要有空格
    'valid-jsdoc': [
      0,
      {
        requireParamDescription: true,
        requireReturnDescription: true,
      },
    ], // jsdoc规则
    'no-warning-comments': [
      2,
      {
        terms: ['todo', 'fixme', 'any other term'],
        location: 'anywhere',
      },
    ], // 不能有警告备注
    curly: 1, // 必须使用 if(){} 中的{}

    // common js
    'no-duplicate-imports': 1,

    // prettier 代码风格校验
    'prettier/prettier': 'error',
  },
};
