/**
 * 任务处理
 */
const spider = require('./spider')
const redis = require('redis')
const log = require('log4js')
const cheerio = require('cheerio')
class Task {
    constructor() {

    }

    parseConf(config) {

    }
    //爬虫入口队列
    async runTask(config, page) {
        const result = {}
        //读取中的任务信息
        if (config.beforeTask) {
            result.beforeTask = this.beforeTask(config.beforeTask)
        }
        let opt = {}
        opt.url = config.start.url
        let html = await spider.pageContent(opt)
        result.task = this.parseHtml(html, config.start.fields)
        if (config.afterTask) {
            result.afterTask = this.afterTask(config.afterTask)
        }

        return result
    }
    parseHtml(html, fields) {
        const $ = cheerio.load(html)
        const result = []
        if(!$ && !fields)
        {
            return result
        }
        
        fields.forEach(element => {
            let rs = {}
            
            let selector = element.selector
            let selectorType = element.selectorType
            rs.name = element.name
            rs.value = ''
            switch (selectorType) {
                case 'html':
                    rs.value = $(selector).html()
                    break;
                case 'text':
                    rs.value = $(selector).text().replace(/\\n/g, '');
                    break;
                case 'attr':
                    rs.value = $(selector).attr(element.attr)
                    break;
                default:
                    ''
            }

            rs.alias = element.alias
            result.push(rs)
        });

        return result
    }
    finishTask() {

    }
    //前置爬取队列
    async beforeTask(config) {
        const result = []
        let url = config.url
        if (!url) {
            return false;
        }
        for (let i = 0; i < url.length; i++) {
            let opt = {}
            opt.url = url
            let pageHtml = await spider.pageContent(opt)
            if (pageHtml) {
                result.push(pageHtml)
            }
        }

        return result
    }
    //待爬队列
    async afterTask(config, page) {
        const result = []
        let url = config.url
        if (!url) {
            return false;
        }
        for (let i = 0; i < url.length; i++) {
            let opt = {}
            opt.url = url
            let pageHtml = await spider.pageContent(opt)
            if (pageHtml) {
                result.push(pageHtml)
            }
        }
        return result
    }

    forkTask() {

    }

    cloneTask() {

    }

    exitTask() {

    }
}

module.exports = Task;