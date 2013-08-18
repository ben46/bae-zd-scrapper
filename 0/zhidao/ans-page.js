var cheerio = require('cheerio')
, nodegrass = require('nodegrass')

function zhidaoAns(ansID, callback){
     var url = "http://zhidao.baidu.com/question/" + ansID + ".html"
    nodegrass.get(url, function(data,status,headers){

        var $ = cheerio.load(data);
        var title = $('.ask-title').text()
        var question = $('pre[accuse="qContent"]').text()
        var ans = $('pre[accuse="aContent"]').text()
        var obj = {  
            "title": title
            , "question": question  
            , "ans": ans
        }; 
        if (callback) {
            callback(obj);
        };

    },'gbk').on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}

module.exports = zhidaoAns;
