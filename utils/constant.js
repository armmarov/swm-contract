const TEST_RESULT = {
    SUCCESS : "SUCCESS",
    FAILED: "FAILED"
};

const TEST_CONDITION = {
    EQUALS : "EQUALS",
    CONTAINS: "CONTAINS",
    GREATER_THAN: "GREATER_THAN",
    LESS_THAN: "LESS_THAN",
    GREATER_THAN_OR_EQUAL: "GREATER_THAN_OR_EQUAL",
    LESS_THAN_OR_EQUAL: "LESS_THAN_OR_EQUAL",
    NOT_NULL: "NOT_NULL",
};

const TEST_RESP_TYPE = {
    STRING: "STRING",
    NUMBER: "NUMBER",
    ARRAY: "ARRAY"
}

exports.TEST_RESULT = TEST_RESULT;
exports.TEST_CONDITION = TEST_CONDITION;
exports.TEST_RESP_TYPE = TEST_RESP_TYPE;