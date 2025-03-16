const deployOperation = require("./deploy-operation");
require('dotenv').config({path: ".env"})

const privateKey = process.env.PRIVATE_KEY;
const sourceAddress = process.env.ZTX_ADDRESS;
const nodeUrl = process.env.NODE_URL;
const contractName = 'swm.js'
const input = {};

deployOperation(nodeUrl, sourceAddress, privateKey, contractName, input);
