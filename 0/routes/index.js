zhidaoSearch = require('../zhidao/search-page.js')
, ans = require('../zhidao/ans-page.js')

module.exports = function(app){

	app.get('/search', function(req, res){
	    var keyword = req.query.q;
		var page = req.query.page;

		zhidaoSearch(keyword, page, function(obj){
			res.end(JSON.stringify(obj));
		});
	});

	app.get('/ans/:id', function(req, res){
	    var ansID = req.params.id
		ans(ansID, function(obj){
			res.end(JSON.stringify(obj));
		});
	});

	app.all('*', function(req,res){
		var obj = {
			code: 404,
			msg:'server not responding'
		}
		res.end(JSON.stringify(obj));
	});

}