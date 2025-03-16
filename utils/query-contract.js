const expect = require('chai').expect;
const {TEST_CONDITION, TEST_RESP_TYPE} = require("./constant");

async function TEST_QUERY(msg, contractHandler, input, expectCondition, expectResult, expectKey = "", expectType = TEST_RESP_TYPE.STRING) {

    console.log('\x1b[36m%s\x1b[0m', msg);

    const sdk = contractHandler.sdk;
    const contractAddress = contractHandler.contractAddress;

    let resp = await sdk.contract.call({
        optType: 2,
        contractAddress: contractAddress,
        input: JSON.stringify(input),
    });

    if (resp.result.query_rets[0].error != null) {
        console.log(resp.result.query_rets[0].error.data);
        expect("").to.equal(expectResult);
        return;
    }

    let res = JSON.parse(resp.result.query_rets[0].result.value);
    console.log(res);

    if (expectKey !== "") {
        res = res[expectKey];
    }

    if (expectType === TEST_RESP_TYPE.NUMBER) {
        res = parseInt(res);
    }

    if (expectCondition === TEST_CONDITION.EQUALS) {
        if (expectType === TEST_RESP_TYPE.ARRAY) {
            expect(res).to.deep.equal(expectResult);
        } else {
            expect(res).to.equal(expectResult);
        }
    } else if (expectCondition === TEST_CONDITION.CONTAINS) {
        expect(res).to.contain(expectResult);
    } else if (expectCondition === TEST_CONDITION.NOT_NULL) {
        expect(res).to.not.be.null;
    } else if (expectCondition === TEST_CONDITION.GREATER_THAN) {
        expect(res).to.greaterThan(expectResult);
    } else if (expectCondition === TEST_CONDITION.LESS_THAN) {
        expect(res).to.lessThan(expectResult);
    } else if (expectCondition === TEST_CONDITION.GREATER_THAN_OR_EQUAL) {
        expect(res).to.greaterThanOrEqual(expectResult);
    } else if (expectCondition === TEST_CONDITION.LESS_THAN_OR_EQUAL) {
        expect(res).to.lessThanOrEqual(expectResult);
    } else {
        throw new Error("Unknown condition: " + expectCondition);
    }

    return res;
}

module.exports = TEST_QUERY;
