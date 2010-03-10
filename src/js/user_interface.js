/*
 * UI
 */

/* Volume */
$(function() {
  $("#volSlider").slider({
    range: "min",
    min:     0,
    max:   100,
    value: 100,
    slide: function(event, ui) {
      setVideoVolume(ui.value);
      updateHTML("videoVolume", num2str3(ui.value));
    }
  });
  
  $('#VolumeControl').bind('mousewheel', function(event, delta) {
    if (!ytplayer.isMute) {
      if (0 < delta) {
        upVideoVolume(5);
      } else {
        upVideoVolume(-5);
      }
    }
    return false;
  });
  
  $('#chkMute').button({icons: {primary: 'ui-icon-volume-on'}});
  
  $('#chkMute').click(function() {
    if ($('#chkMute').attr('checked')) {
      $('.volValue').css('color','#f6931f');
      $("#volSlider").slider('enable');
    } else {
      $('.volValue').css('color','#bbb');
      $("#volSlider").slider('disable');
    }
  });
  
});

/* ----- Control ----- */
$(function() {
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
  // aaa
});
function btnNextEnable(val) {
  val = (val != false);
  boolBtnNextEnable = val;
  if (val) {
    $('#btnNext').button('enable');
  } else {
    $('#btnNext').button('disable');
  }
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
});

/* Help */

function openHelpDialog() {
  alert("すいません、まだ何も書けてません。とりあえずいくつか。\n\n"+
  "* このプレイヤーは Google Chrome＋「アプリケーションのショートカットを作成」が超推奨です。\n"+
  "* 特にIEは酷く、Radioo専用にChrome入れてもいいぐらいです。\n* 音量はマウスホイールでも変えれます。\n\n"+
  "v0.4.0 見た目・UIを変更、バグ修正。\n"+
  "v0.4.2 新規取得曲のシャッフル方法変更。細かな修正。\n"+
  "v0.4.4 新規取得曲のシャッフル方法変更。細かな修正。\n\n"+
  "posterousのRadioooの説明も近いうちになんとかします。\n\n"+
  "3/10 13:10 @khlizard");
  
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
