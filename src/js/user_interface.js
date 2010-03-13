/*
 * UI
 */

/* Volume */
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
  $('#btnRewind').button({
    text: false,
    label: 'Rewind',
    icons: {primary: 'ui-icon-seek-first'}
  }).click(function(){ rewindVideo(); });
  
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
    'href', 'http://twitter.com/search?q=%23'+channel_name);
});

/* ----- Tabs ----- */
$(function() {
  $("#block-tabs").tabs();
});


/* Help */

function openHelpDialog() {
  alert("すいません、まだ何も書けてません。とりあえずいくつか。\n\n"+
  "* このプレイヤーは Google Chrome＋「アプリケーションのショートカットを作成」が超推奨です。\n"+
  "* 特にIEは酷く、Radioo専用にChrome入れてもいいぐらいです。\n* 音量はマウスホイールでも変えれます。\n\n"+
  "v0.4.4 曲名がザ・ベストテン状態になるバグ・Nextボタンが無効でも押せるバグ・埋め込み不可動画で止まるバグの修正。\n"+
  "v0.4.5 タイトルバーに曲名とか\n"+
  "v0.4.6 古いコードが残っていたりして動画IDを取得するのを稀にミスしていた部分を修正。他コードの整理など。\n"+
  "\n"+
  "Radiooooの説明はgithubのwikiに書き直しました。http://wiki.github.com/khtokage/nise-radioooo/ \n\n"+
  "3/13 07:00 @khlizard");
  
  /*
  $("#dialog").dialog("destroy");
  $("#dialog-message").dialog({
    modal: true,
    buttons: {
      Ok: function() { $(this).dialog('close'); }
    }
  });
  */
  
  return false;
}
