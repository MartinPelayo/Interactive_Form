const mainConf = $("input[name='all']");
const jsFrameworks = $("input[name='js-frameworks']");
const jsLibs = $("input[name='js-libs']");
const express = $("input[name='express']");
const node = $("input[name='node']");
const buildTools = $("input[name='build-tools']");
const npm = $("input[name='npm']");
let total = 0;

$(document).ready(function(){ 
  $('#name').css('background-color', 'white');
  $('#name').focus();
});

$('#other-title').hide();

$('#title').change(function(){ 
  let value = $(this).val();
  if(value === 'other'){
    $('#other-title').show();
  }else{
    $('#other-title').hide();
  }
});

$(" option[value='cornflowerblue']").hide(); //Hides and changes shirt values 
$(" option[value='darkslategrey']").hide();
$(" option[value='gold']").hide();  
$(" option[value='tomato']").hide(); 
$(" option[value='steelblue']").hide();
$(" option[value='dimgrey']").hide();

$('#design').change(function(){ 
  let value = $(this).val();
  if(value === 'js puns'){
    $(" option[value='theme']").hide();
    $(" option[value='tomato']").hide(); 
    $(" option[value='steelblue']").hide();
    $(" option[value='dimgrey']").hide();
    $(" option[value='cornflowerblue']").show(); 
    $(" option[value='darkslategrey']").show(); 
    $(" option[value='gold']").show(); 
  } else if(value === 'heart js'){
    $(" option[value='theme']").hide();
    $(" option[value='cornflowerblue']").hide(); 
    $(" option[value='darkslategrey']").hide(); 
    $(" option[value='gold']").hide(); 
    $(" option[value='tomato']").show(); 
    $(" option[value='steelblue']").show();
    $(" option[value='dimgrey']").show();
  }
  else{
    $(" option[value='cornflowerblue']").hide(); 
    $(" option[value='darkslategrey']").hide();
    $(" option[value='gold']").hide();  
    $(" option[value='tomato']").hide(); 
    $(" option[value='steelblue']").hide();
    $(" option[value='dimgrey']").hide();
    $(" option[value='theme']").show();
  }
});

$(jsFrameworks).click(function(e) { //click handlers for disabling/enabling event options
  var target = $(e.target);
  if (target.is(':checked') ) {
    $(express).prop({
      disabled: true
    });
  }else{
    $(express).prop({
      disabled: false
    });
  }
});

$(jsLibs).click(function(e) {
  var target = $(e.target);
  if (target.is(':checked') ) {
    $(node).prop({
      disabled: true
    });
  }else{
    $(node).prop({
      disabled: false
    });
  }
});

$(express).click(function(e) {
  var target = $(e.target);
  if (target.is(':checked') ) {
    $(jsFrameworks).prop({
      disabled: true
    });
  }else{
    $(jsFrameworks).prop({
      disabled: false
    });
  }
});

$(node).click(function(e) {
  var target = $(e.target);
  if (target.is(':checked') ) {
    $(jsLibs).prop({
      disabled: true
    });
  }else{
    $(jsLibs).prop({
      disabled: false
    });
  }
});
  
$("input[type='checkbox']").click(function(e) { //Calculates event total costs
  var target = $(e.target);
  if (target.is(':checked') ) {
    total += 100;
  }else{
    total -= 100;
  }
  if(target.is("input[name='all']") && target.is(':checked')) {
    total += 100;
  }
  else if(target.is("input[name='all']") && !target.is(':checked')){
    total -= 100;
  }
  $('.total').text('$' + total);
});
 
// requirements option section requirements
$("option[value='select_method']").hide();
$("p:contains('the PayPal option')").hide();
$("p:contains('the Bitcoin option')").hide();

$('#payment').change(function(){ //Shows payment options on click
  let value = $(this).val();
  if(value === 'paypal'){
    $("p:contains('the PayPal option')").show();
    $("p:contains('the Bitcoin option')").hide();
    $("button:contains('Register')").prop({
      disabled: false
    });
    $('#cc-num').prop({
      disabled: true
    });  
  } else if (value === 'bitcoin'){
    $("p:contains('the Bitcoin option')").show();
    $("p:contains('the PayPal option')").hide();
    $('#cc-num').prop({
      disabled: true
    }); 
    $("button:contains('Register')").prop({
      disabled: false
    });
  }else{
    $("p:contains('the PayPal option')").hide();
    $("p:contains('the Bitcoin option')").hide();
    $("button:contains('Register')").prop({
      disabled: true
    });
  }
  if(value === 'credit card'){
    $('#cc-num').prop({
      disabled: false
    });      
  }
});


//ERROR validation requirements \\
$('#mail').prop({
  disabled: true
});
$('.activities').prop({
  disabled: true
});
$('.payment').prop({
  disabled: true
});
$('#cc-num').prop({
  disabled: true
});
$('#zip').prop({
  disabled: true
});
$('#cvv').prop({
  disabled: true
});
$("button:contains('Register')").prop({
  disabled: true
});

$('#name').focusout(function(e){ //If name is empty, make border red
  let nameInput = $('#name').val();
  if (nameInput == ''){
    e.preventDefault();
    $('#mail').prop({
      disabled: true
    });
    $('#name').css('border-color', 'red');
  }
});

$('#name').keyup(function(){
  let nameInput = $('#name').val();
  if (nameInput != ''){
    $('#name').css('border-color', 'white');
    $('#mail').prop({
      disabled: false
    });
  }
});

$('#mail').focusout(function(e){ //If address is invalid, make border red
  e.preventDefault();         
  let emailInput = $('#mail').val();
  let aIndex = emailInput.indexOf('@');
  let pIndex = emailInput.lastIndexOf('.');
  if (aIndex < 1 || pIndex < aIndex +2 || pIndex +2 >= emailInput.length) {
    $('.activities').prop({
      disabled: true
    });
    $('#mail').css('border-color', 'red');
  }else{
    $('.activities').prop({
      disabled: false
    });
    $('#mail').css('border-color', '#accbd9');
    $('.payment').prop({
      disabled: false
    });
  }
});

$('#mail').keyup(function(){
  let emailInput = $('#mail').val();
  let aIndex = emailInput.indexOf('@');
  let pIndex = emailInput.lastIndexOf('.');
  if (aIndex > 1 && pIndex > aIndex +2 && pIndex +2 <= emailInput.length){
    $('#mail').css('border-color', 'white');
    $('.activities').prop({
      disabled: false
    });
  }
});

$(".activities input[type='checkbox']").click(function() {  //if no activity is selected, make all red 
  if (mainConf.is(':checked') || jsFrameworks.is(':checked') || jsLibs.is(':checked') 
  || express.is(':checked') || node.is(':checked') || buildTools.is(':checked') || npm.is(':checked') ){
    $('.activities label').css('color', 'black');
    $('.payment').prop({
      disabled: false
    });
  }else{
    $('.payment').prop({
      disabled: true
    });
    $('.activities label').css('color', 'red');
  }
});

$('#payment').change(function(){ 
  let value = $(this).val();
  if(value === 'credit card'){
    $('#cc-num').prop({
      disabled: false
    });
  }
});

$('#cc-num').focusout(function(e){  //Verifies a valid number, makes input red otherwise
  e.preventDefault();
  let val = $('#cc-num').val();
  let valLength = val.length;
  if (isNaN(val) || val === '' || val < 13 || valLength > 16){
    e.preventDefault();
    $('#cc-num').css('border-color', 'red');
    $('#zip').prop({
      disabled: true
    });
  }else{
    $('.error').text('');
    $('#zip').prop({
      disabled: true
    });
  }
  if(valLength > 13 && valLength < 16 && isNaN(val) === false) {
    $('#zip').prop({
      disabled: false
    });
    $('#cc-num').css('border-color', '#accbd9');
  }
});

$('#cc-num').keyup(function(){  
  let val = $('#cc-num').val();
  let valLength = val.length;
  if(valLength > 13 && valLength < 16 && isNaN(val) === false) {
    $('#zip').prop({
      disabled: false
    });
    $('#cc-num').css('border-color', '#accbd9');
  }
});

$('#zip').focusout(function(e){  //Verifies a valid number, makes input red otherwise
  e.preventDefault();
  let val = $('#zip').val();
  let valLength = val.length;
  if (isNaN(val) || valLength != 5){
    e.preventDefault();
    $('.validationPay').text('Must be 5 digits long');
    $('#zip').css('border-color', 'red');
    $('#cvv').prop({
      disabled: true
    });
  }
  if(valLength === 5 && isNaN(val) === false) {
    $('#cvv').prop({
      disabled: false
    }); 
    $('#zip').css('border-color', '#accbd9');
  }
});

$('#zip').keyup(function(){ 
  let val = $('#zip').val();
  let valLength = val.length;
  if(valLength === 5 && isNaN(val) === false) {
    $('#cvv').prop({
      disabled: false
    }); 
    $('#zip').css('border-color', '#accbd9');
  }
}); 

$('#cvv').focusout(function(e){  //Verifies a valid number, makes input red otherwise
  e.preventDefault();
  let val = $('#cvv').val();
  let valLength = val.length;
  if (isNaN(val) || valLength != 3){
    e.preventDefault();
    $("button:contains('Register')").prop({
      disabled: true
    });
    $('#cvv').css('border-color', 'red');

  }else{
    $('.error').text('');
  }
  if(valLength === 3 && isNaN(val) === false) {
    $("button:contains('Register')").prop({
      disabled: false
    });
  }
});

$('#cvv').keyup(function(){ //Finally, if CVV is valid allow for a form submit
  let val = $('#cvv').val();
  let valLength = val.length;
  if(valLength === 3 && isNaN(val) === false) {
    $('#cvv').prop({
      disabled: false
    }); 
    $('#cvv').css('border-color', '#accbd9');
  }
  $("button:contains('Register')").prop({
    disabled: false
  });
});

