module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  ignore: [
    '**/*.test.ts',
    './app/scripts'
  ],
  plugins: [
    "@babel/plugin-transform-async-to-generator",
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    [
        "@babel/plugin-transform-runtime",
        {
            "helpers": true,
            "regenerator": true
        }
    ]
  ]
}
