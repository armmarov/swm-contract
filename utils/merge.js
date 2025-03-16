const fs = require("fs");

let existing = [];

function merge(baseDir, data) {
    let regexQuote = /"/gi;
    data = data.replace(regexQuote, "'");
    let regex = /import '(\S+)';*/g;
    let matches = data.matchAll(regex);
    for (const match of matches) {
        if (!existing.includes(match[1])) {
            let temp = fs.readFileSync(baseDir + match[1] + ".js", 'utf8');
            data = data.replace(match[0], temp);
            existing.push(match[1]);
        } else {
            data = data.replace(match[0], '');
        }
    }
    if (data.includes('import')) {
        return merge(baseDir, data);
    }
    return data;
}

module.exports = merge;