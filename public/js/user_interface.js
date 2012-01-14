/*
 * UI
 */

/* ----- TitleBar ----- */
$(function() {
  $('#videoUserIcon');
});

/* ----- Volume ----- */
$(function() {
  
  $("#volume-slider").slider({
    range: "min",
    min:    0,
    max:  100,
    value: 50,
    slide: function(event, ui) {
      setVideoVolume(ui.value);
      updateHTML("videoVolume", num2str3(ui.value));
    }
  });
  
  $('#volume-control').bind('mousewheel', function(event, delta) {
    if (!ytplayer.isMute) {
      var vol = 5;
      if (delta < 0) vol = vol * -1;
      upVideoVolume(vol);
    }
    return false;
  });
  
  $('#chkMute').button({icons: {primary: 'ui-icon-volume-on'}});
  $('#chkMute').click(function() {
    var chk = $('#chkMute').attr('checked');
    $('.volume-value').css('color', chk ? '#f6931f' : '#bbb');
    $("#volume-slider").slider(chk ? 'enable'  : 'disable');
  });
  
});

/* ----- Control ----- */
$(function() {
  $('#btnPriv').button({
    text: false,
    label: 'Priv',
    icons: {primary: 'ui-icon-seek-first'}
  }).click(function(){
    if (ytplayer.getCurrentTime() <= 5) {
      privSong();
    } else {
      rewindVideo();
    }
  });
  
  $('#btnPlay').button({
    text: false,
    label: 'Play',
    icons: {primary: 'ui-icon-play'}
  }).click(playVideo);
  
  $('#btnPause').button({
    text: false,
    label: 'Pause',
    icons: {primary: 'ui-icon-pause'}
  }).click(pauseVideo);
  
  $('#btnNext').button({
    text: false,
    label: 'Next',
    icons: {primary: 'ui-icon-seek-end'}
  }).click(function(){
    if (boolBtnNextEnable) nextSong();
  });
});
function btnNextEnable(val) {
  val = (val != false);
  boolBtnNextEnable = val;
  $('#btnNext').button(val ? 'enable' : 'disable');
  return val;
}
var boolBtnNextEnable = true;



/* ----- Radiooo ----- */
$(function() {
  $('#btnClap').button({
    text: true,
    label: 'CLAP!'
  });
  $('#btnStand').button({
    text: true,
    label: 'STAND!'
  });
  
  $('#radioo-channel').text('#'+channel_name);
  $('#radioo-channel').attr(
    'href', 'http://search.twitter.com/search?q=%23'+channel_name);
});

/* ----- Tabs ----- */
$(function() {
  $("#block-tabs").tabs();
});


/* Help */

function openHelpDialog() {
  var msg = "簡単な説明\n\n" +
  "■このプレイヤーは？\nTwitter上で　「(youtubeの動画ID) #"+channel_name+"」 や\n　「(検索文字列)聞きたい #"+channel_name+"」\nの様な形でリクエストされた曲をひたすら再生するプレイヤーです。\n\n" +
  
  "■ハッシュタグは固定？\nリクエスト用のタグは変更可能で、例えば\n　「http://radioooclone.vanu.jp/?foobar」\nにアクセスすれば #foobar が検索対象のタグとなります。\n\n" +
  "■Tips\n* このプレイヤーは Google Chrome＋「アプリケーションのショートカットを作成」が超推奨です。\n" +
  "* 特にIEは酷く、Radioo専用にChrome入れてもいいぐらいです。\n* 音量はマウスホイールでも変えれます。\n\n" +
  
  "■更新履歴\n" +
  "v0.4.8：\n　RewindボタンにPriv機能追加（動画開始5秒以内なら前の曲へ）\n　UIをタブに変更\n" +
  "v0.4.9：\n　Rewind/Privボタンのバグ修正。\n　Chromeでショートカット作成時のメタ情報添加。\n" +
  "v0.4.10：\n　人によってプレイリストがきちんと取れない問題を修正\n　ちっちゃいアイコン付加。\n" +
  "v0.5.0：\n　次をマージ。\n　- かぼちゃさんの修正（再生時のエラー等回避）\n　- 宏美ちゃんの機能追加（「～聞きたい #tag」での検索リク等）\n　- いけめんくえいるのバグ修正\n　Bookmarkletの掲載\n　その他バグ修正やライブラリ更新など\n" +
  "\n" +
  "もっと詳しい説明はgithubのwikiをご確認ください。\n" +
  "\n" +
  "2012/01/13 @khlizard";
  alert(msg);
  
  /*
  $("#dialog").dialog("destroy");
  $("#dialog-message").dialog({
    modal: true,
    buttons: {
      Ok: function() { $(this).dialog('close'); }
    }
  });
  //window.open(pUrl, mWinName, mOption);
  */
  
  //window.open("http://www.google.com/", "", "alwaysLowered=no, dependent=no, hotkeys=no, width=200, height=160, ",false)
  
  return false;
}

$(function() {
  $("meta[name='application-name']")
    .attr('content', 'RadioooClone #'+channel_name);
  $("meta[name='application-url']")
    .attr('content', location.href);
});
