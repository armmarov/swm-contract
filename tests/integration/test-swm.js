const ZtxChainSDK = require('zetrix-sdk-nodejs');
const {TEST_RESULT, TEST_CONDITION, TEST_RESP_TYPE} = require("../../utils/constant");
const TEST_QUERY = require("../../utils/query-contract");
const TEST_INVOKE = require("../../utils/invoke-contract");
require('dotenv').config({path: "/../.env"})
require('mocha-generators').install();

const privateKey = process.env.PRIVATE_KEY;
const sourceAddress = process.env.ZTX_ADDRESS;

const contractHandler = {
    sdk: new ZtxChainSDK({
        host: process.env.NODE_URL,
        secure: true
    }),
    contractAddress: process.env.CONTRACT_ADDRESS
};

const txInitiator = {
    privateKey: privateKey,
    sourceAddress: sourceAddress,
};

describe('Test contract sequence inbox', function () {
    this.timeout(100000);

    xit('testing add task', async () => {

        await TEST_INVOKE("### Add Task",
            contractHandler, txInitiator, {
                method: 'addTask',
                params: {
                    remarks: "Please pick up as soon as possible",
                    //Organic Waste, Recyclable Waste, Liquid Waste, Solid Waste, Hazardous Waste
                    type: "Recyclable Waste",
                    subType: "Glass",
                    district: "Kampung Baru",
                    state: "Johor",
                    phone: "0152263355"
                }
            }, '1000', TEST_RESULT.SUCCESS);
    });

    it('testing get task by id', async () => {

        await TEST_QUERY("### query task by id",
            contractHandler, {
                method: 'getTask',
                params: {
                    id: '46e42d36c7e994f98c19'
                }
            }, TEST_CONDITION.NOT_NULL, "", "data"); // 10000
    });

    it('testing get all tasks', async () => {

        await TEST_QUERY("### query all tasks",
            contractHandler, {
                method: 'getAllTasks',
                params: {
                    status: "None"
                }
            }, TEST_CONDITION.NOT_NULL, "", "data"); // 10000
    });

    xit('testing delete task', async () => {

        await TEST_INVOKE("### Delete Task",
            contractHandler, txInitiator, {
                method: 'deleteTask',
                params: {
                    id: "0f8a71202ad48c2f04cf"
                }
            }, '1000', TEST_RESULT.SUCCESS);
    });

    xit('testing accept task', async () => {

        await TEST_INVOKE("### Accept Task",
            contractHandler, txInitiator, {
                method: 'acceptTask',
                params: {
                    id: "534f57b79f455e1806ba"
                }
            }, '0', TEST_RESULT.SUCCESS);
    });

    xit('testing complete task', async () => {

        await TEST_INVOKE("### Accept Task",
            contractHandler, txInitiator, {
                method: 'completeTask',
                params: {
                    id: "46e42d36c7e994f98c19"
                }
            }, '0', TEST_RESULT.SUCCESS);
    });

    xit('testing cancel task', async () => {

        await TEST_INVOKE("### Cancel Task",
            contractHandler, txInitiator, {
                method: 'cancelTask',
                params: {
                    id: "534f57b79f455e1806ba"
                }
            }, '0', TEST_RESULT.SUCCESS);
    });


});
