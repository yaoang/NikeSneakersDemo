const config = {
  verbose: true,
  "testPathDirs": ["routes"],
  testMatch: [
    "**/?(*.)+(spec|test).js"
  ],
  "testPathIgnorePatterns": [
    "/node_modules/",
    "/static/"
  ],
  roots: [
    "<rootDir>"
  ],
  testRegex: "",
  rootDir: null
}

module.exports = config