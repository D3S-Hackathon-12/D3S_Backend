$('#btn1').on("click", function () {
  $('#number').attr('value', $('#number').attr('value') + '1');
});

$('#btn2').on("click", function () {
  $('#number').attr('value', $('#number').attr('value') + '2');
});

$('#btn3').on("click", function () {
  $('#number').attr('value', $('#number').attr('value') + '3');
});

$('#btn4').on("click", function () {
  $('#number').attr('value', $('#number').attr('value') + '4');
});

$('#btn5').on("click", function () {
  $('#number').attr('value', $('#number').attr('value') + '5');
});

$('#btn6').on("click", function () {
  $('#number').attr('value', $('#number').attr('value') + '6');
});

$('#btn7').on("click", function () {
  $('#number').attr('value', $('#number').attr('value') + '7');
});

$('#btn8').on("click", function () {
  $('#number').attr('value', $('#number').attr('value') + '8');
});

$('#btn9').on("click", function () {
  $('#number').attr('value', $('#number').attr('value') + '9');
});

$('#btn0').on("click", function () {
  $('#number').attr('value', $('#number').attr('value') + '0');
});

$('#del').on('click', function () {
  console.log($('#number').attr('value').length);
  $('#number').attr('value', $('#number').attr('value').substring(0, $('#number').attr('value').length - 1));
})

$('#submit_button').on('click', function () {
  $('#card form').submit();
})
