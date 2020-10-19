//function PlaySound(buzzer) {
//var thissound = document.getElementById(buzzer);
// thissound.play();
//}
import $ from "jQuery";

function play() {
  var buzzer = document.getElementById("buzzer");
  buzzer.play();
}

play();

console.log("fuck yeah!");

$(document).ready(function () {
  console.log("hi!");
  var buzzer = $("#buzzer");
  buzzer.play();
  $("#reset").hide();

  $("#Start").click(function () {
    var buzzer = $("#buzzer")[0];
    console.log(typeof buzzer);
    buzzer.play();
  });
});
