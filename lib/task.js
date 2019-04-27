const spider = require('./spider')
const redis = require('redis')
const log = require('log4js')
const spider = require('./spider')
class runSpider{

    constructor() {
        
    }

    parseConf(config) {
        
    }
    //执行抓取任务
    runTask(config) {
        const result = {}
        //读取中的任务信息
        const beforeTask, afterTask
        if(config.beforeTask)
        {
            result.beforeTask = this.beforeTask(config.beforeTask)
        }
        if(config.afterTask)
        {
            result.afterTask = this.afterTask(config.afterTask)
        }
        const starturl = conf.starturl
        const files = conf.files

        return result
    }

    finishTask() {

    }

    async beforeTask(config) {
        const result = []
        let url = config.url
        if(!url)
        {
            return false;
        }
        for(let i = 0; i<url.length; i++)
        {
            let opt = {}
            opt.url = url
            let pageHtml = await spider.pageHtml(opt)
            if(pageHtml)
            {
                result.push(pageHtml)
            }
        }

        return result
    }

    afterTask(config) {
        const result = []
        let url = config.url
        if(!url)
        {
            return false;
        }
        for(let i = 0; i<url.length; i++)
        {
            let opt = {}
            opt.url = url
            let pageHtml = await spider.pageHtml(opt)
            if(pageHtml)
            {
                result.push(pageHtml)
            }
        }
        return result
    }
}