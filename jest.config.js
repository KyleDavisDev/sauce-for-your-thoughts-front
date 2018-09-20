module.exports = {
  setupTestFrameworkScriptFile: require.resolve("./__tests__/jest.setup.js"),
  // moduleDirectories: [
  //   "node_modules",
  //   "__tests__", // a utility folder
  //   __dirname // the root directory
  // ],
  roots: ["<rootDir>/__tests__"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"]
};
