/*************
* @author      Fakefish
* 某天在github上看到一个jQuery插件--jquery-url（http://github.com/websanova/jquery-url）
* 然后就参考着写了如下的函数
*
**************/

var urls = (function (arg, url) {
	// 例子：url="www.example.com:8080"
	var _url = url || window.location.toString();
	// 判断url是否含有http或https，没有就加上
  if(!(_url.substring(0, 7) === 'http://' || _url.substring(0, 8) === 'https://')) 
  	_url = 'http://' + _url;
  // "http://www.example.com:8080"
  url = _url.split('/');
  // ["http:", "", "www.example.com:8080"]
  var host = url[2].split(':');
  // ["www.test.com", "8080"]
  var _l = {protocol:url[0], hostname:host[0], port:(host[1]||'80'), pathname:'/' + url.slice(3, url.length).join('/').split('?')};
  // {protocl:"http:",hostname:"www.example.com", port:"8080",pathname:'/'}
})(arg, url);