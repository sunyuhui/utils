/**
 * 静态文件服务器
 * @author sunyuhui92@gmail.com
 */

var http = require("http");
var url = require('url');
var fs = require('fs');
var path = require('path');


var server = http.createServer(function(request, response) {

	if(request.url === '/favicon.ico') {return;}
	let pathName = path.join(__dirname, url.parse(request.url).pathname);
	pathName = decodeURIComponent(pathName);

	console.log(pathName);

	if( fs.statSync(pathName).isDirectory() ) {
		response.writeHead(200, {
			'Content-Type': 'text/html; charset=utf-8'
		});
		fs.readdir(pathName, (err, files)=>{
			response.write('<ul>');
			files.forEach((item)=>{
				let link = path.join(url.parse(request.url).pathname, item);
				console.log(link, url.parse(request.url).pathname);
				response.write('<li><a href="${link}">${item}</a></li>');
			});
			response.end('</ul>');
		});
		
	}


});
server.listen(8080, '127.0.0.1', ()=>{
	console.log('running in 127.0.0.1:8080')
});
