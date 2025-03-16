'use strict';

const TASK_PRE = 'task';
const TASK_LIST = 'task_list';

const EnTaskStatus = Object.freeze({
    NONE: 'None',
    PENDING: 'Pending',
    IN_PROGRESS: 'InProgress',
    COMPLETED: 'Completed'
});

const BASE_FEE = 1000;

function loadObj(key) {
    let data = Chain.load(key);
    if (data !== false) {
        return JSON.parse(data);
    }

    return false;
}

function saveObj(key, value) {
    let str = JSON.stringify(value);
    Chain.store(key, str);
}

function delObj(key) {
    Chain.del(key);
}

function getKey(k1, k2, k3 = '', k4 = '') {
    return (k4 === '') ? (k3 === '') ? (k1 + '_' + k2) : (k1 + '_' + k2 + '_' + k3) : (k1 + '_' + k2 + '_' + k3 + '_' + k4);
}

function _updateStatus(task, status) {
    task.status = status;
    task.updateTime = Chain.block.timestamp;

    if (task.status === EnTaskStatus.PENDING) {
        task.operator = '0';
        task.acceptedTime = 0;
        task.completedTime = 0;
    }

    if (task.status === EnTaskStatus.IN_PROGRESS) {
        task.operator = Chain.msg.sender;
        task.acceptedTime = Chain.block.timestamp;
        task.completedTime = 0;
    }

    if (task.status === EnTaskStatus.COMPLETED) {
        task.completedTime = Chain.block.timestamp;
    }
    saveObj(task.id, task);
}

/*
    Task Structure

    task : {
        id
        remarks:
        type: Organic Waste, Recyclable Waste, Liquid Waste, Solid Waste, Hazardous Waste
        district:
        state:
        phone:
        subType:
            - Organic Waste: Food
            - Recyclable Waste: Plastics, Glass, Paper, Metals
            - Liquid Waste: Wastewater, Chemicals, Oils
            - Solid Waste: Clothing, Packaging, Goods, Electronic
            - Hazardous Waste: Toxic Materials, Battery, Medical Waste
        fee:
        operator:
        owner:
        addedTime:
        acceptedTime:
        completedTime:
        updatedTime:
        status:
        hash:
        block:
    }
 */
function addTask(type, subType, district, state, phone, remarks) {

    Utils.assert(Utils.int64Compare(Chain.msg.coinAmount, BASE_FEE) >= 0, 'Not enough coin amount.');
    Utils.assert(type !== '', 'Task type is required.');
    Utils.assert(subType !== '', 'Task subType is required.');
    Utils.assert(district !== '', 'Task district is required.');
    Utils.assert(state !== '', 'Task state is required.');
    Utils.assert(phone !== '', 'Task phone is required.');

    let key = Utils.sha256(getKey(TASK_PRE, Chain.msg.sender, Chain.block.timestamp), 1);

    let task = {};
    task.id = key.substr(0, 20);
    task.addedTime = Chain.block.timestamp;
    task.updatedTime = Chain.block.timestamp;
    task.acceptedTime = 0;
    task.completedTime = 0;
    task.fee = Chain.msg.coinAmount;
    task.status = EnTaskStatus.PENDING;
    task.operator = '0';
    task.owner = Chain.msg.sender;
    task.type = type;
    task.subType = subType;
    task.district = district;
    task.state = state;
    task.phone = phone;
    task.remarks = remarks;
    task.hash = Chain.tx.hash;
    task.block = Chain.block.number;
    saveObj(task.id, task);

    let tasks = loadObj(TASK_LIST);
    if (tasks === false) {
        tasks = [];
    }
    tasks.push(task.id);
    saveObj(TASK_LIST, tasks);
    Chain.tlog("SWM_TASK_ADDED", task.id, JSON.stringify(task));
}

function getTask(id) {
    let task = loadObj(id);
    if (task === false) {
        return false;
    }
    return task;
}

function getAllTasks(status = EnTaskStatus.NONE) {
    let tasks = loadObj(TASK_LIST);
    if (tasks === false) {
        return [];
    }
    let taskList = [];
    let i;
    for (i = 0; i < tasks.length; i += 1) {
        let task = getTask(tasks[i]);
        if (task !== false) {
            if (status !== EnTaskStatus.NONE && task.status === status) {
                // Filter by status
                taskList.push(task);
            } else if (status === EnTaskStatus.NONE) {
                // Return all tasks
                taskList.push(task);
            }
        }
    }
    return taskList;
}

function acceptTask(id) {
    let task = getTask(id);
    if (task !== false) {
        Utils.assert(task.status === EnTaskStatus.PENDING, 'Task is not pending.');
        Utils.assert(task.operator === '0', 'Task is already accepted.');
        _updateStatus(task, EnTaskStatus.IN_PROGRESS);
        Chain.tlog("SWM_TASK_ACCEPTED", id, task.operator, task.status, task.updateTime);
    }
}

function completeTask(id) {
    let task = getTask(id);
    if (task !== false) {
        Utils.assert(task.status === EnTaskStatus.IN_PROGRESS, 'Task is not in progress.');
        Utils.assert(task.owner === Chain.msg.sender, 'Task must be completed by owner.');
        _updateStatus(task, EnTaskStatus.COMPLETED);
        Chain.payCoin(
            task.operator,
            task.fee,
            'SWM pay check');
        Chain.tlog("SWM_TASK_COMPLETED", id, task.status, task.updateTime);
        Chain.tlog("SWM_PAY", id, task.operator, task.fee);
    }
}

function cancelTask(id) {
    let task = getTask(id);
    if (task !== false) {
        Utils.assert(task.status === EnTaskStatus.IN_PROGRESS, 'Task can only be cancelled when in progress.');
        Utils.assert(task.operator === Chain.msg.sender, 'Task can only be cancelled by operator.');
        _updateStatus(task, EnTaskStatus.PENDING);
        Chain.tlog("SWM_TASK_CANCELLED", id);
    }
}

function forceCancelTask(id) {
    let task = getTask(id);
    if (task !== false) {
        Utils.assert(task.status === EnTaskStatus.IN_PROGRESS, 'Task can only be cancelled when in progress.');
        Utils.assert(task.owner === Chain.msg.sender, 'Task can only be cancelled by owner.');
        Utils.assert(Utils.int64Compare(Chain.block.timestamp, task.acceptedTime + 259200000) >= 0, 'Task can only be cancelled within 3 days after accepted.');
        _updateStatus(task, EnTaskStatus.PENDING);
        Chain.tlog("SWM_TASK_FORCED_CANCELLED", id);
    }
}

function deleteTask(id) {
    let task = getTask(id);
    if (task !== false) {
        Utils.assert(task.owner === Chain.msg.sender, 'Task can only be deleted by owner.');
        Utils.assert(task.status === EnTaskStatus.PENDING, 'Task can only be deleted when pending.');
        delObj(id);
        let tasks = loadObj(TASK_LIST);
        if (tasks !== false) {
            const index = tasks.indexOf(id);
            if (index > -1) {
                tasks.splice(index, 1);
            }
            saveObj(TASK_LIST, tasks);
        }
        Chain.tlog("SWM_TASK_DELETED", id);
    }
}

function init() {
    return true;
}

function main(input_str) {
    let input = JSON.parse(input_str);
    let params = input.params;

    let result = {};
    if (input.method === 'addTask') {
        addTask(params.type, params.subType, params.district, params.state, params.phone, params.remarks);
    } else if (input.method === 'acceptTask') {
        acceptTask(params.id);
    } else if (input.method === 'completeTask') {
        completeTask(params.id);
    } else if (input.method === 'cancelTask') {
        cancelTask(params.id);
    } else if (input.method === 'forceCancelTask') {
        forceCancelTask(params.id);
    } else if (input.method === 'deleteTask') {
        deleteTask(params.id);
    } else {
        throw 'Unknown operating: ' + input.method + '.';
    }

    return JSON.stringify(result);
}

function query(input_str) {
    let input = JSON.parse(input_str);
    let params = input.params;

    let result = {};
    if (input.method === 'getTask') {
        result.data = getTask(params.id);
    } else if (input.method === 'getAllTasks') {
        result.data = getAllTasks(params.status);
    } else {
        throw 'Unknown operating: ' + input.method + '.';
    }

    return JSON.stringify(result);
}
