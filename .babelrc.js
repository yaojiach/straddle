module.exports = {
  plugins: [
    ['@babel/plugin-transform-runtime', { helpers: false }],
    ['@babel/plugin-transform-spread', { loose: false }]
  ]
}
