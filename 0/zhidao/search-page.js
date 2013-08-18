var cheerio = require('cheerio')
, nodegrass = require('nodegrass')

function zhidaoSearchPage(keyword, page, callback){
    host = 'http://zhidao.baidu.com/search?word=' + keyword + '&site=0&pn=' + (page*10);
    var obj = {code:0, msg:'ok', list:[]};

    nodegrass.get(host, (function(obj){
        return function(data,status,headers){
            var $ = cheerio.load(data);
            var attri1 = $('.dl');
            attri1.each(function(day) {
                var tmpObj = {};
                // console.log(day);
                var a = $(this).find('dt a');
                tmpObj.title = a.text();
                tmpObj.url = a.attr('href');
                var pttrn = /(\d)+/
                tmpObj.ansID = pttrn.exec(tmpObj.url)[0]; 
                tmpObj.desc = $(this).find('dd').text()

                var attri = $(this).find('span');
                attri.each(function(index){
                    if (index == 0) {
                        tmpObj.good = $(this).text();
                    }
                    if (index == 1) {
                        tmpObj.date = $(this).text();
                    };
                    if (index == 2) {
                        tmpObj.user = $(this).find('a').text();
                    };
                    if (attri.length == index + 1) {
                        obj.list.push(tmpObj);
                    }
                    if (attri1.length == day + 1 && attri.length == index + 1) {
                        if (callback) {
                            callback(obj);                
                        };
                    };
                })
            });
        };
    }) (obj),'gbk').on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}

module.exports = zhidaoSearchPage;
