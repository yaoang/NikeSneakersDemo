const config = {
    verbose: true,
    "testPathDirs": ["src"],
    testMatch: [
        "**/?(*.)+(spec|test).js"
    ],
    "testPathIgnorePatterns": [
        "/node_modules/",
        "/build/"
    ],
    roots: [
        "<rootDir>"
    ],
    testRegex: "",
    rootDir: null
}

module.exports = config