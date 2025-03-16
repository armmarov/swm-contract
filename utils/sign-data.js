async function signData(sdk, privateKey, data) {

    const signed = sdk.transaction.sign({
        privateKeys: [privateKey],
        blob: data
    })

    if (signed.errorCode !== 0) {
        return signed.errorCode;
    }

    return signed.result.signatures;
}

module.exports = signData;
