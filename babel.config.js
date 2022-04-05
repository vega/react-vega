module.exports = {
  "ignore": [
    "coverage/",
    "node_modules/",
    "public/",
    "esm/",
    "lib/",
    "tmp/",
    "dist/",
    "*.d.ts",
    "__tests__",
    "__mocks__"
  ],
  "plugins": [
    [
      "babel-plugin-transform-dev",
      {
        "evaluate": false
      }
    ],
    "babel-plugin-typescript-to-proptypes",
    "@babel/plugin-proposal-class-properties"
  ],
  "presets": [
    [
      "@babel/preset-env",
      {
        "loose": true,
        "modules": false,
        "shippedProposals": true,
        "targets": false,
        "bugfixes": false
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
};