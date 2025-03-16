/**
 * Zetrix Smart Contract built-in function started with prefix Utils.*
 *
 */
const Utils = {

    /**
     * 256-bit comparison
     *
     * @param {string|number} x - Left value.
     * @param {string|number} y - Right value.
     * @returns {number} - Return value 1: left value is greater than right value, 0: equal to, and -1: less than
     * @throws {Error} An exception is thrown if it fails.
     * @example let ret = Utils.int256Compare('12345678912345', 1);
     * @readonly
     */
    int256Compare: (x, y) => {
    },

    /**
     * 256-bit addition
     *
     * @param {string|number} x - Left value.
     * @param {string|number} y - Right value.
     * @returns {string} - The string number is returned successfully
     * @throws {Error} An exception is thrown if it fails.
     * @example let ret = Utils.int256Add('12345678912345', 1);
     * @readonly
     */
    int256Add: (x, y) => {
    },

    /**
     * 256-bit subtraction
     *
     * @param {string|number} x - Left value.
     * @param {string|number} y - Right value.
     * @returns {string} - The string number is returned successfully
     * @throws {Error} An exception is thrown if it fails.
     * @example let ret = Utils.int256Sub('12345678912345', 1);
     * @readonly
     */
    int256Sub: (x, y) => {
    },

    /**
     * 256-bit division
     *
     * @param {string|number} x - Left value.
     * @param {string|number} y - Right value.
     * @returns {string} - The string number is returned successfully
     * @throws {Error} An exception is thrown if it fails.
     * @example let ret = Utils.int256Div('12345678912345', 2);
     * @readonly
     */
    int256Div: (x, y) => {
    },

    /**
     * 256-bit modulo
     *
     * @param {string|number} x - Left value.
     * @param {string|number} y - Right value.
     * @returns {string} - The string number is returned successfully
     * @throws {Error} An exception is thrown if it fails.
     * @example let ret = Utils.int256Mod('12345678912345', 2);
     * @readonly
     */
    int256Mod: (x, y) => {
    },

    /**
     * 256-bit multiplication
     *
     * @param {string|number} x - Left value.
     * @param {string|number} y - Right value.
     * @returns {string} - The string number is returned successfully
     * @throws {Error} An exception is thrown if it fails.
     * @example let ret = Utils.int256Mul('12345678912345', 2);
     * @readonly
     */
    int256Mul: (x, y) => {
    },

    /**
     * 64-bit comparison
     *
     * @param {string|number} x - Left value.
     * @param {string|number} y - Right value.
     * @returns {number} - Return value 1: left value is greater than right value, 0: equal to, and -1: less than
     * @throws {Error} An exception is thrown if it fails.
     * @example let ret = Utils.int64Compare('12345678912345', 1);
     * @readonly
     */
    int64Compare: (x, y) => {
    },

    /**
     * 64-bit addition
     *
     * @param {string|number} x - Left value.
     * @param {string|number} y - Right value.
     * @returns {string} - The string number is returned successfully
     * @throws {Error} An exception is thrown if it fails.
     * @example let ret = Utils.int64Add('12345678912345', 1);
     * @readonly
     */
    int64Add: (x, y) => {
    },

    /**
     * 64-bit subtraction
     *
     * @param {string|number} x - Left value.
     * @param {string|number} y - Right value.
     * @returns {string} - The string number is returned successfully
     * @throws {Error} An exception is thrown if it fails.
     * @example let ret = Utils.int64Sub('12345678912345', 1);
     * @readonly
     */
    int64Sub: (x, y) => {
    },

    /**
     * 64-bit division
     *
     * @param {string|number} x - Left value.
     * @param {string|number} y - Right value.
     * @returns {string} - The string number is returned successfully
     * @throws {Error} An exception is thrown if it fails.
     * @example let ret = Utils.int64Div('12345678912345', 2);
     * @readonly
     */
    int64Div: (x, y) => {
    },

    /**
     * 64-bit modulo
     *
     * @param {string|number} x - Left value.
     * @param {string|number} y - Right value.
     * @returns {string} - The string number is returned successfully
     * @throws {Error} An exception is thrown if it fails.
     * @example let ret = Utils.int64Mod('12345678912345', 2);
     * @readonly
     */
    int64Mod: (x, y) => {
    },

    /**
     * 64-bit multiplication
     *
     * @param {string|number} x - Left value.
     * @param {string|number} y - Right value.
     * @returns {string} - The string number is returned successfully
     * @throws {Error} An exception is thrown if it fails.
     * @example let ret = Utils.int64Mul('12345678912345', 2);
     * @readonly
     */
    int64Mul: (x, y) => {
    },

    /**
     * sha256 calculation
     *
     * @param {string} data - The original data to be hashed is filled in data using different formats according to different dataTypes.
     * @param {number} dataType - The data type of data, integer, optional field, defaults to 0. 0: base16 encoded string, such as "61626364"; 1: ordinary original string, such as "abcd"; 2: base64 encoded string, Such as "YWJjZA==". If hashing binary data, it is recommended to use base16 or base64 encoding.
     * @returns {string|boolean} - The base16 encoded string after hashing will be returned if successful, false will be returned if failed.
     * @example let ret = Utils.sha256('61626364');
     * @readonly
     */
    sha256: (data, dataType = 0) => {
    },

    /**
     * Address legality check
     *
     * @param {string} address - Address to check
     * @returns {boolean} - Returns true on success, false on failure
     * @example let ret = Utils.addressCheck('adxSio3m7C7D84GzgmtTXanUNMwPezys9azQB');
     * @readonly
     */
    addressCheck: (address) => {
    },

    /**
     * Verify whether the signature is legal
     *
     * @param {string} signedData - Signature data, base16 encoded string
     * @param {string} publicKey - Public key, base16 encoded string
     * @param {string} blobData - Original data, fill in data using different formats according to blobDataType
     * @param {number} blobDataType - Data type of blobData, integer, optional field, default is 0. 0: base16 encoded string, such as "61626364"; 1: ordinary original string, such as "abcd"; 2: base64 encoded string, Such as "YWJjZA==". If verifying binary data, it is recommended to use base16 or base64 encoding.
     * @returns {boolean} - It will return true on success and false on failure.
     * @example let ret = Utils.ecVerify('3471aceac411975bb83a22d7a0f0499b4bfcb504e937d29bb11ea263b5f657badb40714850a1209a0940d1ccbcfc095c4b2d38a7160a824a6f9ba11f743ad80a', 'b0014e28b305b56ae3062b2cee32ea5b9f3eccd6d738262c656b56af14a3823b76c2a4adda3c', 'abcd', 1);
     * @readonly
     */
    ecVerify: (signedData, publicKey, blobData, blobDataType = 0) => {
    },

    /**
     * Public key to address
     *
     * @param {string} publicKey - Public key, base16 encoded string
     * @returns {string|boolean} - If successful, the account address will be returned; if failed, false will be returned.
     * @example let ret = Utils.toAddress('b0014e067cdae290c47a558cd0438e6361d11b2cf48863be1cde030fe0a41ae23eff8e1533a1');
     * @readonly
     */
    toAddress: (publicKey) => {
    },

    /**
     * Output log
     *
     * @param {string} info - Log content.
     * @returns {boolean|undefined} - No return value if successful, a Trace level log will be output in the corresponding contract execution process, such as V8contract log[ZTX3Z7HNR1Nk8D8wm6pkcWNb6rnMZncyTVHSb:hello]; if it fails, false will be returned.
     * @example let ret = Utils.log('hello');
     * @readonly
     */
    log: (info) => {
    },

    /**
     * 64-bit string number legality check
     *
     * @param {string} strNumber - String numeric parameter.
     * @returns {boolean} - Returns true on success, false on failure
     * @example let ret = Utils.stoI64Check('12345678912345');
     * @readonly
     */
    stoI64Check: (strNumber) => {
    },

    /**
     * 256-bit string number legality check
     *
     * @param {string} strNumber - String numeric parameter.
     * @returns {boolean} - Returns true on success, false on failure
     * @example let ret = Utils.stoI256Check('12345678912345');
     * @readonly
     */
    stoI256Check: (strNumber) => {
    },

    /**
     * Assertion
     *
     * @param {boolean} condition - Assert variable
     * @param {string} msg - Optional, exception message thrown on failure
     * @returns {boolean} - Returns true on success
     * @throws {Error} An exception is thrown if it fails.
     * @example Utils.assert(1===1, "Not valid");
     * @readonly
     */
    assert: (condition, msg = '') => {
    },

    /**
     * Convert units
     *
     * @param {string} value - The number to be converted can only be passed into a string, which can contain a decimal point, and a maximum of 6 digits can be retained after the decimal point.
     * @returns {string|boolean} - Success will return a string multiplied by 10^6, failure will return false
     * @example let ret = Utils.toBaseUnit('12345678912');
     * @readonly
     */
    toBaseUnit: (value) => {
    },

    /**
     * Range proof verification
     *
     * @param {string} commit - 66-bit Pedersen commitment string
     * @param {string} proof - Range proof string, variable length
     * @returns {boolean} - Returns true on success, false on failure
     * @example let ret = Utils.bpRangeProofVerify('097ff10254037114cae985f044189a3faa044ac32c26ffadc0f08dc4b81a536638', '410905f651c9448e8a4e6db10c0bc23b2b09cf37ee2b6909b0e9178cf89b371584ea8533ed9648a942feb6b797bbdd8e9cd49ab8a86e6bf89f7e3b2c35c01818ad9006329e8dc4c9e335d60021b13c33c8aa8bd471908be4ce74a4cdfe968006abc3819e9e7d0aba261b947ed9bd8706d439707e783e34323c7c24b7c3dd722b66546f5c0d7c66d6c5a7390cc4cd1ed4ef53a0b1db3778a56b0ff418bfcababd966ae82cf0f44c29ba27f9eaa0a9ca1b4c913ddb7e42453666ccfbaad55f981b8cbede5023705cfeb08a26b323ea05b06ba3853cbfe02315c335f742c6a4ca290ca3d31a619534a38fc0754a6b52b9b66e69088a6265a0e68914b1a230bbd6d742875aac47259be01d60fff5c301c552a66b81152b2b2d7dca9064cde271690e30a7cae5fee6b89e0bd7a5c571d561f65a7d34cb4f5aba49fbeef91132e229fdf38ca61c2c737d3055ea143d0e5732b43ade6d7cf66269c7b3333f1ee9a295fc7f5d3cf47770d9a15651d176fa2792e39ad4bdacb14eb13657faf5eed43f3620a09441a5032c4919744692844a214455204662e9f7f80c88a569ab1a1986186f35a0eefd53d7be56d1150ed6a0cb030a10de35d0cb25738d66234646998b70dc6210ec8985c9bda183dd0a0d985c1bf1255afc326fd86029bc88e2db0433061a0bf6be107d6ddebb2516843b9c6a56f9e03a420e4665bc013f7e6a497412015d4fed2cf9895c756857d5434799e20fbf8feef4473c778bd06fc997ea9772bec1d0cc30870580575017239cef0f693922c12a1ab850628302f970d07caaa54196c5ed59eefaaad981dfeeef4efe06d5ab3634b8e9882416cde960dee25f22701faf63086771d2987e3b300659278cc9e8543ee81c9f70ebbe2897f1020c609b3fe1667358b5998dbf089720cecc401810acbb48864262065c7742c5cd2b83b76aafc6ff2428e51a66e89ca1b1cf552bb8f8a261fb2e91e49ea68fc2db1c00a079bf2b0b39c9f43be25d31136399666ff05dcbbbc98d47358a5052c0d3cd113f9f0a3fe6838babd160411f22d6a187f73b69e45f042149e7e1e879a8b75c6ac4dfa4bbb473f22f89738f163f2a64efb20a0bb67e16acd06791080cc5246d48887a158f8b');
     * @readonly
     */
    bpRangeProofVerify: (commit, proof) => {
    },

    /**
     * Input and output equality verification
     *
     * @param {Array} inputCommits - Input pedersen promise list in JSON array
     * @param {Array} outputCommits - Output pedersen promise list in JSON array
     * @param {string} excessMsg - Message to be signed, 32-bit string, no encoding required
     * @param {string} excessSign - Transaction kernel (input minus output remainder) signature result string
     * @returns {boolean} - Returns true on success, false on failure
     * @example let ret = Utils.pedersenTallyVerify(['08aab3b3c403129887d1f5932565c0fd9ef7b8d562de6eb0b6eb64c1b7396d268a'], ['08a64f2ed7be3940dfb5b76b450418524df48837595c98698dbe191708cb911c40', '09c28bb504d0c4e4ea4f19e3041a90b608aada114fab1786175ffaefd5fe6c0d3b'], 'b649bd965a5126984cc785cbeb1ef053', '304402202345c4e1f4efd8bfdb77681e7d638f9a8f29f473e47a698c56eeab3fe3bc278502206bbdf0db0e04bafa4a88c0382b9b600e72976fceeaa9129cb257a82a89ee52fb');
     * @readonly
     */
    pedersenTallyVerify: (inputCommits, outputCommits, excessMsg, excessSign) => {
    },

    /**
     * Convert hexadecimal to decimal string
     *
     * @param {string} strHex - String in hexadecimal format
     * @returns {string|boolean} - Success returns the decimal format string, failure returns false
     * @example let ret = Utils.hexToDec('aeb61626364');
     * @readonly
     */
    hexToDec: (strHex) => {
    }
}
