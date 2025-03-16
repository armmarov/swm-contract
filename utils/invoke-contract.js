const BigNumber = require('bignumber.js');
const expect = require('chai').expect;
const sleep = require("../utils/delay");
const {TEST_RESULT} = require("./constant");

async function TEST_INVOKE(msg, contractHandler, txInitiator, input, amount = '0', expectResult = TEST_RESULT.SUCCESS) {

    console.log('\x1b[36m%s\x1b[0m', msg);

    const sdk = contractHandler.sdk;
    const contractAddress = contractHandler.contractAddress;
    const sourceAddress = txInitiator.sourceAddress;
    const privateKey = txInitiator.privateKey;

    const nonceResult = await sdk.account.getNonce(sourceAddress);

    if (nonceResult.errorCode !== 0) {
        console.log(nonceResult);
        return nonceResult.errorCode;
    }

    let nonce = nonceResult.result.nonce;
    nonce = new BigNumber(nonce).plus(1).toString(10);

    let contractInvoke = await sdk.operation.contractInvokeByGasOperation({
        contractAddress,
        sourceAddress,
        gasAmount: amount,
        input: JSON.stringify(input),
    });

    if (contractInvoke.errorCode !== 0) {
        console.log(contractInvoke);
        return contractInvoke.errorCode;
    }

    const operationItem = contractInvoke.result.operation;

    let feeData = await sdk.transaction.evaluateFee({
        sourceAddress,
        nonce,
        operations: [operationItem],
        signtureNumber: '100',
    });

    if (feeData.errorCode !== 0) {
        console.log(feeData);
        return feeData.errorCode;
    }

    let feeLimit = feeData.result.feeLimit;
    let gasPrice = feeData.result.gasPrice;

    const blobInfo = sdk.transaction.buildBlob({
        sourceAddress: sourceAddress,
        gasPrice: gasPrice,
        feeLimit: feeLimit,
        nonce: nonce,
        operations: [operationItem],
    });

    if (blobInfo.errorCode !== 0) {
        console.log(blobInfo);
        return blobInfo.errorCode;
    }

    const signed = sdk.transaction.sign({
        privateKeys: [privateKey],
        blob: blobInfo.result.transactionBlob
    })

    if (signed.errorCode !== 0) {
        console.log(signed);
        return signed.errorCode;
    }

    let submitted = await sdk.transaction.submit({
        signature: signed.result.signatures,
        blob: blobInfo.result.transactionBlob
    })

    if (submitted.errorCode !== 0) {
        console.log(submitted);
        return submitted.errorCode;
    }

    let info = null;
    for (let i = 0; i < 10; i++) {
        console.log("Getting the transaction history (attempt " + (i + 1).toString() + ")...")
        info = await sdk.transaction.getInfo(submitted.result.hash)
        if (info.errorCode === 0) {
            console.log("Transaction has been successfully submitted: " + submitted.result.hash)
            break;
        }
        sleep(2000);
    }

    if (expectResult === TEST_RESULT.FAILED) {
        expect(info.errorCode).to.equal(151);
    } else {
        expect(info.errorCode).to.equal(0);
    }

}

module.exports = TEST_INVOKE;
