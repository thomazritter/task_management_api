export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": ["babel-jest", { configFile: "./babel.config.js" }]
  },
  verbose: true,
  forceExit: true
};