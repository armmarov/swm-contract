/**
 * Zetrix Smart Contract built-in function started with prefix Chain.*
 *
 */
const Chain = {
    /**
     * Get the metadata information of the contract account
     *
     * @param {string} key - Key of metadata.
     * @returns {string|boolean} - Returns a string if successful, such as 'values', false if failed
     * @example let value = Chain.load('abc');
     * @readonly
     */
    load(key) {
    },

    /**
     * Stores metadata information of contract accounts
     *
     * @param {string} key - Key of metadata.
     * @param {string} value - Value of metadata.
     * @returns {boolean} - Return true on success
     * @throws {Error} Throw exception on failure
     * @example Chain.store('abc', 'values');
     */
    store(key, value) {
    },

    /**
     * Delete the metadata information of the contract account
     *
     * @param {string} key - Key of metadata.
     * @returns {boolean} - Return true on success
     * @throws {Error} Throw exception on failure
     * @example Chain.del('abc');
     */
    del(key) {
    },

    /**
     * Output transaction log. tlog will generate a transaction and write it on the block
     *
     * @param {string} topic - Log topic, must be string type, parameter length (0,128]
     * @param {string} msg1 -  The parameter type can be string, numerical or Boolean type. The length of each parameter is (0,1024]
     * @param {string} msg2 -  The parameter type can be string, numerical or Boolean type. The length of each parameter is (0,1024]
     * @param {string} msg3 -  The parameter type can be string, numerical or Boolean type. The length of each parameter is (0,1024]
     * @param {string} msg4 -  The parameter type can be string, numerical or Boolean type. The length of each parameter is (0,1024]
     * @param {string} msg5 -  The parameter type can be string, numerical or Boolean type. The length of each parameter is (0,1024]
     * @returns {boolean} - Return true on success
     * @throws {Error} Throw exception on failure
     * @example Chain.tlog('transfer', sender + ' transfer 1000', true);
     * @readonly
     */
    tlog(topic, msg1 = '', msg2 = '', msg3 = '', msg4 = '', msg5 = '') {
    },

    /**
     * Get the metadata of the specified account
     *
     * @param {string} address - Account address.
     * @param {string} key - Key of metadata.
     * @returns {string} - Returns a string if successful, such as 'values', false if failed
     * @example let value = Chain.getAccountMetadata('ZTX3Z7HNR1Nk8D8wm6pkcWNb6rnMZncyTVHSb', 'abc');
     * @readonly
     */
    getAccountMetadata(address, key) {
    },

    /**
     * Get account coin amount
     *
     * @param {string} address - Account address.
     * @returns {string} - String format number '9999111100000'
     * @example let balance = Chain.getBalance('ZTX3Z7HNR1Nk8D8wm6pkcWNb6rnMZncyTVHSb');
     * @readonly
     */
    getBalance(address) {
    },

    /**
     * Get asset information of an account
     *
     * @param {string} address - Account address.
     * @param {string} assetKey - Asset attribute.
     * @returns {string} - If successful, the asset number such as '10000' will be returned, if failed, false will be returned.
     * @example
     * let asset_key =
     * {
     *   'issuer' : 'ZTX3Z7HNR1Nk8D8wm6pkcWNb6rnMZncyTVHSb',
     *   'code' : 'CNY'
     * };
     * let bar = Chain.getAccountAsset('ZTX3Z7HNR1Nk8D8wm6pkcWNb6rnMZncyTVHSb', asset_key);
     * @readonly
     */
    getAccountAsset(address, assetKey) {
    },

    /**
     * Get the permission information of an account
     *
     * @param {string} address - Account address.
     * @returns {string} - Successfully returns permission json string such as '{"master_weight":1,"thresholds":{"tx_threshold":1}}', failure returns false
     * @example let privilege = Chain.getAccountPrivilege('ZTX3Z7HNR1Nk8D8wm6pkcWNb6rnMZncyTVHSb');
     * @readonly
     */
    getAccountPrivilege(address) {
    },

    /**
     * Get contract account attributes
     *
     * @param {string} address - Account address.
     * @returns {string} - Successfully returns a JSON object, such as {"type":0, "length" : 416}, type refers to the contract type, length refers to the length of the contract code, if the account is not a contract, length is 0 Return false on failure
     * @example let value = Chain.getContractProperty('ZTX3onEfJM33jCpLHru87dcfeRfB9kdqdzzat');
     * @readonly
     */
    getContractProperty(address) {
    },

    /**
     * Transfer or invoke contract
     *
     * @param {string} address - Destination Zetrix address.
     * @param {string} amount - Zetrix amount to send.
     * @param {string} input - Optional, contract parameters, if not filled in by the user, the default is an empty string.
     * @param {string} metadata - Optional transfer remarks. When calling the GET /getTransactionHistory method to query the transaction results, it is displayed as a hexadecimal string and needs to be converted into plain text.
     * @remarks If the metadata parameter is provided, the input parameter must also be provided, otherwise the built-in interface cannot distinguish who the parameter is, because both are optional. If there is no input, you can pass in the empty string "" placeholder to prevent the built-in interface from mistaking metadata parameters for input parameters.
     * @returns {boolean} - Return true on success
     * @throws {Error} Throw exception on failure
     * @example Chain.payCoin("ZTX3Z7HNR1Nk8D8wm6pkcWNb6rnMZncyTVHSb", "10000", "", "vote reward");
     */
    payCoin(address, amount, input = '', metadata = '') {
    },

    /**
     * Issue assets
     *
     * @param {string} code - Asset code.
     * @param {string} amount - Number of assets issued.
     * @returns {boolean} - Return true on success
     * @throws {Error} Throw exception on failure
     * @example Chain.issueAsset("CNY", "10000");
     */
    issueAsset(code, amount) {
    },

    /**
     * Transfer assets
     *
     * @param {string} address - Target address for transferring assets
     * @param {string} issuer - Asset issuer
     * @param {string} code - Asset code
     * @param {string} amount - Amount of assets transferred
     * @param {string} input - Optional, contract parameters, if not filled in by the user, the default is an empty string
     * @param {string} metadata - Optional transfer remarks. When calling the GET /getTransactionHistory method to query the transaction results, it is displayed as a hexadecimal string and needs to be converted into plain text.
     * @remarks If the metadata parameter is provided, the input parameter must also be provided, otherwise the built-in interface cannot distinguish who the parameter is, because both are optional. If there is no input, you can pass in the empty string "" placeholder to prevent the built-in interface from mistaking metadata parameters for input parameters.
     * @returns {boolean} - Return true on success
     * @throws {Error} Throw exception on failure
     * @example Chain.payAsset("ZTX3Z7HNR1Nk8D8wm6pkcWNb6rnMZncyTVHSb", "ZTX3io3m7C7D84GzgmtTXanUNMwPezys9azQB", "CNY", "10000", "", "Trading certificate");
     */
    payAsset(address, issuer, code, amount, input = '', metadata = '') {
    },

    /**
     * Delegate call
     *
     * @param {string} contractAddress - The called contract address.
     * @param {string} input - Call parameters.
     * @remarks The Chain.delegateCall function will trigger the main function entry of the called contract and assign the execution environment of the current contract to the called contract. For example, if contract A delegates to call contract B, it will execute the code of B (main entry) and read or write the data of A.
     * @returns {Object|string} - Success will return the result of the execution of the main function of the delegate contract
     * @throws {Error} Throw exception on failure
     * @example let ret = Chain.delegateCall('ZTX3d6Qg8UFayWWuzLjMwJUt6f7oTz5GJEjDj'，'{}');
     */
    delegateCall(contractAddress, input) {
    },

    /**
     * Delegate query
     *
     * @param {string} contractAddress - The called contract address.
     * @param {string} input - Call parameters.
     * @remarks The Chain.delegateQuery function will trigger the query function entry of the called contract and assign the execution environment of the current contract to the called contract. For example, contract A entrusts contract B to query, that is, execute the code of B (query entry) and read the data of A.
     * @returns {Object} - If the call is successful, a JSON object {"result":"xxx"} will be returned, in which the value of the result field is the specific result of the query. If the call fails, a JSON object {"error":true} will be returned.
     * @example let ret = Chain.delegateQuery('ZTX3d6Qg8UFayWWuzLjMwJUt6f7oTz5GJEjDj'，"");
     * @readonly
     */
    delegateQuery(contractAddress, input) {
    },

    /**
     * Call contract
     *
     * @param {string} contractAddress - The called contract address.
     * @param {boolean|object} asset - Asset category, true represents Zetrix, object {"issue": adxxxx, "code" : USDT} represents assets.
     * @param {string} amount - Asset quantity
     * @param {string} input - Call parameters
     * @remarks The Chain.contractCall function will trigger the main function entry of the called contract.
     * @returns {Object|boolean} - If the target account is an ordinary account, true is returned. If the target account is a contract, the result of the main function execution of the delegated contract will be returned successfully.
     * @throws {Error} Throw exception on failure
     * @example let ret = Chain.contractCall('ZTX3d6Qg8UFayWWuzLjMwJUt6f7oTz5GJEjDj'，true, toBaseUnit("10"), "");
     */
    contractCall(contractAddress, asset, amount, input) {
    },

    /**
     * Query contract
     *
     * @param {string} contractAddress - The called contract address.
     * @param {string} input - Call parameters.
     * @remarks Chain.contractQuery will call the query interface of the contract.
     * @returns {Object} - If the call is successful, a JSON object {"result":"xxx"} will be returned, in which the value of the result field is the specific result of the query. If the call fails, a JSON object {"error":true} will be returned.
     * @example let ret = Chain.contractQuery('ZTX3d6Qg8UFayWWuzLjMwJUt6f7oTz5GJEjDj'，"");
     * @readonly
     */
    contractQuery(contractAddress, input) {
    },

    /**
     * Create contract
     *
     * @param {string} balance - String type, the asset transferred to the created contract..
     * @param {number} type - Integer type, 0 represents javascript
     * @param {string} code - String type, contract code
     * @param {string} input - init function initialization parameters.
     * @remarks Chain.contractCreate creates a contract.
     * @returns {string} - If the creation is successful, the contract address string will be returned.
     * @throws {Error} Throw exception on failure
     * @example let ret = Chain.contractCreate(toBaseUnit("10"), 0, "'use strict';function init(input){return input;} function main(input){return input;} function query(input){return input;} ", "");
     */
    contractCreate(balance, type, code, input) {
    },

    /**
     * Block information Chain.block
     */
    block: {
        /**
         * Current block timestamp.
         * @remarks The timestamp of the block when the current transaction was executed.
         * @example let timestamp = Chain.block.timestamp
         */
        timestamp: '',

        /**
         * Current block height
         * @remarks The height of the block when the current transaction is executed.
         * @example let currentBlock = Chain.block.number;
         */
        number: ''
    },

    /**
     * Transaction Chain.tx
     * @remarks The transaction is the transaction information signed by the user
     */
    tx: {
        /**
         * Transaction initiator
         * @remarks The transaction is the transaction information signed by the user
         * @example let initiator = Chain.tx.initiator
         */
        initiator: '',

        /**
         * Transaction trigger
         * @remarks The original trigger of the transaction is the account that triggers the execution of the contract in the transaction. For example, an account initiates a transaction, and an operation in the transaction is to call contract Y (the source_address of the operation is x). Then during the execution of contract Y, the value of sender is the address of account x.
         * @example let sender = Chain.tx.sender;
         */
        sender: '',

        /**
         * Transaction gas price
         * @remarks Gas price in transaction signature
         * @example let gasPrice = Chain.tx.gasPrice
         */
        gasPrice: '',

        /**
         * Transaction hash value
         * @remarks Transaction hash value
         * @example let hash = Chain.tx.hash
         */
        hash: '',

        /**
         * Transaction fee limit
         * @remarks Transaction fee limit
         * @example let fee = Chain.tx.feeLimit
         */
        feeLimit: ''
    },

    /**
     * Message Chain.msg
     * @remarks Messages are information generated by triggering the execution of smart contracts in transactions. During the execution of the triggered contract, the transaction information will not be changed, but the message will change. For example, when contractCall and contractQuery are called in a contract, the message will change.
     */
    msg: {
        /**
         * Originator of message
         * @remarks The original originator account of this message.
         * @example let initiator = Chain.msg.initiator
         */
        initiator: '',

        /**
         * Message trigger
         * @remarks The account of the person who triggered this message. For example, an account initiates a transaction, and an operation in the transaction is to call contract Y (the source_address of the operation is x). Then during the execution of contract Y, the value of sender is the address of account x.
         * @example let sender = Chain.msg.sender
         */
        sender: '',

        /**
         * Zetrix coin amount
         * @remarks Zetrix coin amount for this payment operation
         * @example let amount = Chain.msg.coinAmount
         */
        coinAmount: '',

        /**
         * The assets of this payment operation.
         * @remarks For object type {"amount": 1000, "key" : {"issuer": "ZTX3Z7HNR1Nk8D8wm6pkcWNb6rnMZncyTVHSb", "code":"CNY"}}
         * @example let asset = Chain.msg.asset
         */
        asset: '',

        /**
         * The nonce value of the initiator in this transaction
         * @remarks The nonce value of the Chain.msg.initiator account
         * @example let nonce = Chain.msg.nonce
         */
        nonce: '',

        /**
         * The sequence number of the operation that triggered this contract call
         * @remarks This value is equal to the sequence number of the operation that triggered this contract. For example, account A initiates a transaction tx0, and the 0th (counting from 0) operation in tx0 is to transfer assets to a contract account (call the contract), then the value of Chain.msg.operationIndex is 0.
         * @example let index = Chain.msg.operationIndex
         */
        operationIndex: ''
    },

    /**
     * The address of the current contract account
     * @remarks This value is equal to the address of the contract account. For example, account x initiates a transaction to call contract Y. During this execution, the value is the address of Y contract account.
     * @example let contractAddress = Chain.thisAddress
     */
    thisAddress: ''
}