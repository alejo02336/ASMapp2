

function PlayMusic(id, playb, slider) {
  var au = document.getElementById(id);
  var play = document.getElementById(playb);


  var volume = document.querySelector(slider);
  au.volume = volume.value / 100;
 
    if (au.paused) {
      au.play();
      play.style.background = "url(image/pause.png)";
    } else {
      au.pause();
      play.style.background = "url(image/play.png)";
    }
  
}

function ajustarVolumen(idaudio, slid) {
  audio = document.querySelector(idaudio);
  audio.volume = slid.value / 100;
  console.log(slid);
}

var volume1 = document.querySelector("#slider1");
volume1.addEventListener("input", function () {
  ajustarVolumen("#audio1", volume1);
});

var volume2 = document.querySelector("#slider2");
volume2.addEventListener("input", function () {
  ajustarVolumen("#audio2", volume2);
});

var volume3 = document.querySelector("#slider3");
volume3.addEventListener("input", function () {
  ajustarVolumen("#audio3", volume3);
});

var volume4 = document.querySelector("#slider4");
volume4.addEventListener("input", function () {
  ajustarVolumen("#audio4", volume4);
});

var volume5 = document.querySelector("#slider5");
volume5.addEventListener("input", function () {
  ajustarVolumen("#audio5", volume5);
});

var volume6 = document.querySelector("#slider6");
volume6.addEventListener("input", function () {
  ajustarVolumen("#audio6", volume6);
});

var volume7 = document.querySelector("#slider7");
volume7.addEventListener("input", function () {
  ajustarVolumen("#audio7", volume7);
});

var volume8 = document.querySelector("#slider8");
volume8.addEventListener("input", function () {
  ajustarVolumen("#audio8", volume8);
});

var volume9 = document.querySelector("#slider9");
volume9.addEventListener("input", function () {
  ajustarVolumen("#audio9", volume9);
});
