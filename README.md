# myspider

#install

npm install myspider

#Task

const Task = myspider.task

let task = new Task()

let page = await task.runTask({
            start: {
                url: 'https://movie.douban.com/subject/26100958/?from=showing',
                fields: [
                    {
                        name: "title",
                        selector: "#content > h1",
                        selectorType: "text",
                        alias: "标题"
                    },
                    {
                        name: "rating_num",
                        selector: "#interest_sectl > div.rating_wrap.clearbox > div.rating_self.clearfix > strong",
                        selectorType: "html",
                        alias: "豆瓣评分"
                    },
                    {
                        name: "property",
                        selector: "#interest_sectl > div.rating_wrap.clearbox > div.rating_self.clearfix > strong",
                        selectorType: "attr",
                        attr: "property",
                        alias: "property"
                    }, 
                    {
                        name: "href",
                        selector: "#mainpic > a",
                        selectorType: "attr",
                        attr: "href",
                        alias: "href"
                    },
                    {
                        name: "img",
                        selector: "#mainpic > a > img",
                        selectorType: "attr",
                        attr: "src",
                        alias: "imgsrc"
                    }, 
                    {
                        name:"html_content",
                        selector:"#content",
                        selectorType:"html",
                        alias:"content"
                    }
                ]
            }
        })