const ZtxChainSDK = require('zetrix-sdk-nodejs');
const co = require('co');
const fs = require("fs");
const BigNumber = require('bignumber.js');
const sleep = require("../utils/delay");
const merge = require("../utils/merge");
const beautifyData = require("../utils/beautify");

async function deployOperation(nodeUrl, sourceAddress, privateKey, contractName, input, metadata = undefined) {
    /*
     Specify the Zetrix Node url
     */
    const sdk = new ZtxChainSDK({
        host: nodeUrl,
        secure: true
    });

    let cnames = contractName.split('/');
    let cname = cnames[cnames.length - 1];
    cname = cname.split('.')[0];

    let baseDir = './contracts/';

    let contractData = beautifyData(merge(baseDir, fs.readFileSync(baseDir + contractName, 'utf8')));
    let contractAddress = null;

    fs.writeFile('generated/merged-contract-' + cname + '.js', contractData, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
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

    let contractCreateOperation = sdk.operation.contractCreateOperation({
        sourceAddress: sourceAddress,
        initBalance: '0',
        payload: contractData,
        initInput: JSON.stringify(input),
        owner: sourceAddress,
        metadata: metadata
    });

    if (contractCreateOperation.errorCode !== 0) {
        console.log(contractCreateOperation)
        console.log("### ERROR while create contract operation...")
        return;
    }

    const operationItem = contractCreateOperation.result.operation;

    let feeData = await sdk.transaction.evaluateFee({
        sourceAddress,
        nonce,
        operations: [operationItem],
        signtureNumber: '100',
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
    for (let i = 0; i < 20; i++) {
        console.log("Getting the transaction history (attempt " + (i + 1).toString() + ")...")
        info = await sdk.transaction.getInfo(submitted.result.hash)
        if (info.errorCode === 0) {
            break;
        }
        sleep(2000);
    }

    console.log("");
    if (info != null && info.errorCode === 0) {
        console.log("Your contract has been successfully deployed.")
        console.log("Contract address", JSON.parse(info.result.transactions[0].error_desc)[0].contract_address);
        console.log("Hash value", submitted.result.hash);
        contractAddress = JSON.parse(info.result.transactions[0].error_desc)[0].contract_address;
    } else {
        console.log("Your contract deployment has failed.")
        console.log("Hash value", submitted.result.hash);
    }

    console.log("");
    console.log("#####################################")
    console.log("### Finish Deployment...")
    console.log("#####################################")

    return contractAddress;
}

module.exports = deployOperation;
