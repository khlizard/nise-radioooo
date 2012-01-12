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
    min:     0,
    max:   100,
    value: 100,
    slide: function(event, ui) {
      setVideoVolume(ui.value);
      updateHTML("videoVolume", num2str3(ui.value));
    }
  });
  
  $('#volume-control').bind('mousewheel', function(event, delta) {
    if (!ytplayer.isMute) {
      var vol = 5;
      if (delta < 0) vol = vol * -1
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
  var msg = "すいません、まだ何も書けてません。とりあえずいくつか。\n\n" +
  "* このプレイヤーは Google Chrome＋「アプリケーションのショートカットを作成」が超推奨です。\n" +
  "* 特にIEは酷く、Radioo専用にChrome入れてもいいぐらいです。\n* 音量はマウスホイールでも変えれます。\n\n" +
  "■v0.4.7 \nRewind(巻き戻し)実装。タブを載せるために場所整理。\n" +
  "■v0.4.8 \nRewind & Priv に変更。動画開始5秒以内だと前の曲を流します。\nタブ掲載。タブに載せる物は未実装です =)\n" +
  "■v0.4.9 \nRewind/Privボタンのバグ修正。\nChromeでショートカット作成時のメタ情報添加。\n" +
  "■v0.4.10 \n人によってプレイリストがきちんと取れない問題を修正\nちっちゃいアイコン付加。\n" +
  "\n" +
  "Radiooooの説明はgithubのwikiに書き直しました。http://wiki.github.com/khtokage/nise-radioooo/ \n" +
  "\n" +
  "3/15 04:00 @khlizard";
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
