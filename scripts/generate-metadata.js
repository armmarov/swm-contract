const fs = require("fs");
const merge = require("../utils/merge");
const beautifyData = require("../utils/beautify");

async function generateMetadata(contractName) {
    let baseDir = './contracts/';
    return beautifyData(merge(baseDir, fs.readFileSync(baseDir + contractName, 'utf8')));
}

module.exports = generateMetadata;
