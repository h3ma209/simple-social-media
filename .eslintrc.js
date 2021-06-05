module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    
		'vue/html-indent': ['error', 'tab'],
		'vue/html-closing-bracket-newline': 'off',
		'indent': [0, 'tab'],
		'no-tabs': 'off',
    'object-shorthand':0,
    'vue/require-prop-type-constructor':0
  }
}
