/*************
* @author      Fakefish
* 某天在github上看到一个jQuery插件--jquery-url（http://github.com/websanova/jquery-url）
* 然后就参考着写了如下的函数
*
**************/

var urls = function (arg, url) {
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
  var _h  = _l.hostname, 
      _hs = _h.split('.'),
      _p  = _l.pathname,
      _ps = _p.split('/');

  if(!arg)
    return _url;
  else if(arg === 'domain')    return _h;
  else if(arg === 'host')      return _hs.slice(-2).join('.');
  else if(arg === 'tld')       return _hs.slice(-1).join('.');
  else if(arg === 'sub')       return _hs.slice(0,_hs.length - 2).join('.');
  else if(arg === 'port')      return _l.port || '8080';
  else if(arg === 'protocol')  return _l.protocol.split(':')[0];
  else if(arg === 'path')      return _p;
  else if(!isNaN(arg)){ arg = parseInt(arg); return _ps[arg < 0 ? _ps.length + arg : arg] || '';}
  else if(arg === 'file')      return _ps.slice(-1);
  else if(arg === 'filename')  return _ps.slice(-1)[0].split('.')[0];
  else if(arg === 'fileext')   return _ps.slice(-1)[0].split('.')[1] || '';
  else if(arg[0] === '?' || arg[0] === '#'){
    var params = _ls,
        param  = null;
    if(arg[0] === '?')
      params = (params.split('?')[1] || '').split('#')[0];
    else if(arg[0] === '#') 
      params = (params.split('#')[1] || '');
    if(!arg[1]) return params;

    arg = arg.substring(1);
    params = params.split('&');

    for(var i = 0, len = params.length; i< len; i++){
      param = params[i].split('=');
      if(param[0] === arg) return param[1];
    }
  }

  return '';
};