// ==UserScript==
// @name           Request #$Tag$
// @version        0.4
// @namespace      http://radioooclone.vanu.jp/
// @description    Add Radioooo request button #$Tag$
// @include        http://www.youtube.com/watch*
// ==/UserScript==

var tag = '$Tag$';
var js = 'window.open(\'https://twitter.com/intent/tweet?hashtags='+ tag +'&text=%40home+\'+escape((location.href.match(/v=([^&=]{11})/)||[,0])[1]),null,"width=400,height=300,menubar=no,toolbar=no,location=no,status=no,resizable=no,scrollbars=no");undefined;';
var btn = document.createElement('button');
btn.id = 'radioooo-request';
btn.innerHTML = '<img src="http://radioooclone.vanu.jp/img/radioooo.png"/>';
btn.setAttribute('onClick', js);
btn.setAttribute('title', "Request #$Tag$");
btn.setAttribute('type', 'button');
btn.setAttribute('class', 'yt-uix-button');

(function(){
  document.getElementById("watch-actions").appendChild(btn);
})();

