const beautify = require('js-beautify').js;

function beautifyData(data) {
    return beautify(data, {
        indent_size: 2,
        indent_with_tabs: false,
        space_in_empty_paren: true,
        preserve_newlines: true,
        max_preserve_newlines: 2,
    });
}

module.exports = beautifyData;
