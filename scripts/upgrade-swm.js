const upgradeOperation = require("./upgrade-operation");
require('dotenv').config({path: ".env"})

const privateKey = process.env.PRIVATE_KEY;
const sourceAddress = process.env.ZTX_ADDRESS;
const nodeUrl = process.env.NODE_URL;
const contractName = 'swm.js'
const contractAddress = process.env.CONTRACT_ADDRESS;

upgradeOperation(nodeUrl, sourceAddress, privateKey, contractName, contractAddress);
