const ZtxChainSDK = require('zetrix-sdk-nodejs');
const BigNumber = require('bignumber.js');
const sleep = require("../utils/delay");

async function setMetadataOperation(nodeUrl, sourceAddress, privateKey, contractAddress, metadata) {
    /*
     Specify the Zetrix Node url
     */
    const sdk = new ZtxChainSDK({
        host: nodeUrl,
        secure: true
    });

    console.log("#####################################")
    console.log("###  Start Deployment...")
    console.log("#####################################")
    console.log("");

    const nonceResult = await sdk.account.getNonce(sourceAddress);

    if (nonceResult.errorCode !== 0) {
        console.log("nonceResult", nonceResult);
        console.log("### ERROR while getting nonce...")
        return;
    }

    let nonce = nonceResult.result.nonce;
    nonce = new BigNumber(nonce).plus(1).toString(10);

    console.log("Your nonce is", nonce);

    // let accountSetMetadataOperation = sdk.operation.accountSetMetadataOperation({
    //     key: key,
    //     value: value,
    //     // deleteFlag: 1,
    //     version: version
    // });
    // Define the string
    let contractInvokeByGasOperation = await sdk.operation.contractInvokeByGasOperation({
        contractAddress,
        sourceAddress,
        gasAmount: '0',
        input: JSON.stringify({
            method:'setTemplate',
            params: {
                template: 'def'
            }
        }),
        metadata : Buffer.from("test 1 2 3", 'utf8').toString('hex')
    });

    if (contractInvokeByGasOperation.errorCode !== 0) {
        console.log(contractInvokeByGasOperation)
        console.log("### ERROR while set metadata operation...")
        return;
    }

    const operationItem = contractInvokeByGasOperation.result.operation;
    console.log(operationItem)
    let feeData = await sdk.transaction.evaluateFee({
        sourceAddress,
        nonce,
        operations: [operationItem],
        signtureNumber: '100',
        // metadata : 'aaa2'
    });

    if (feeData.errorCode !== 0) {
        console.log(feeData)
        console.log("### ERROR while evaluating fee...")
        return;
    }

    let feeLimit = feeData.result.feeLimit;
    let gasPrice = feeData.result.gasPrice;

    console.log("Fee limit for this contract is", feeLimit);
    console.log("Estimated gas price is", gasPrice);

    const blobInfo = sdk.transaction.buildBlob({
        sourceAddress: sourceAddress,
        gasPrice: gasPrice,
        feeLimit: feeLimit,
        nonce: nonce,
        operations: [operationItem],
    });

    const signed = sdk.transaction.sign({
        privateKeys: [privateKey],
        blob: blobInfo.result.transactionBlob
    })

    let submitted = await sdk.transaction.submit({
        signature: signed.result.signatures,
        blob: blobInfo.result.transactionBlob
    })

    if (submitted.errorCode !== 0) {
        console.log(submitted)
        console.log("### ERROR while submitting contract...")
        return;
    }

    console.log("");
    let info = null;
    for (let i = 0; i < 10; i++) {
        console.log("Getting the transaction history (attempt " + (i + 1).toString() + ")...")
        info = await sdk.transaction.getInfo(submitted.result.hash)
        if (info.errorCode === 0) {
            break;
        }
        sleep(2000);
    }

    console.log("");
    if (info != null && info.errorCode === 0) {
        console.log("Metadata has been successfully set.")
        console.log("Hash value", submitted.result.hash);
    } else {
        console.log("Set metadata has failed.")
        console.log("Hash value", submitted.result.hash);
    }

    console.log("");
    console.log("#####################################")
    console.log("### Finish Deployment...")
    console.log("#####################################")

    return submitted.result.hash;
}

module.exports = setMetadataOperation;
