/**
 * 任务队列  redis实现
 */
const redis = require('redis')
const client = redis.createClient({

})
class TaskList {

    addList(taskid) {

    }

    removeList(taskid) {

    }
    //等待事件
    waitfor() {
        
    }
    //唤醒事件
    waitup(taskid) {

    }

}

module.exports = TaskList