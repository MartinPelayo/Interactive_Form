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

//Hides and changes shirt values
$(" option[value='cornflowerblue']").hide(); 
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

//click handlers for disabling/enabling event options
$(jsFrameworks).click(function(e) { 
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

//Calculates event total costs for event options
$("input[type='checkbox']").click(function(e) { 
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
$('#credit-card').hide();

//Shows payment options on click
$('#payment').change(function(){
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
    $('#credit-card').hide(); 
  } else if (value === 'bitcoin'){
    $("p:contains('the Bitcoin option')").show();
    $("p:contains('the PayPal option')").hide();
    $('#cc-num').prop({
      disabled: true
    }); 
    $("button:contains('Register')").prop({
      disabled: false
    });
    $('#credit-card').hide();
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
    $('#credit-card').show();
  }
});

//Handler checks all required info sections of form when
//the submit button is clicked
$("button:contains('Register')").click(function(e){
  e.preventDefault();         
  let nameInput = $('#name').val(); 
  if (nameInput == ''){
    $("button:contains('Register')").prop({
      disabled: true
    });
    $('#name').css('border-color', '#c13c24');
  }else{
    $('#name').css('border-color', 'white');
  }

  let emailInput = $('#mail').val(); 
  let aIndex = emailInput.indexOf('@');
  let pIndex = emailInput.lastIndexOf('.');
  if (aIndex < 1 || pIndex < aIndex +2 || pIndex +2 >= emailInput.length) {
    $('#mail').css('border-color', '#c13c24');
    $("button:contains('Register')").prop({
      disabled: true
    });
  }
  if (mainConf.is(':checked') || jsFrameworks.is(':checked') || jsLibs.is(':checked') 
   || express.is(':checked') || node.is(':checked') || buildTools.is(':checked') || npm.is(':checked')){
    $('legend span').text('').css('color', '#c13c24');
    $("button:contains('Register')").prop({
      disabled: true
    });
  }else{
    $('legend span').text(' Must Choose at Least 1').css('color', '#c13c24');
  }

  if($('.default').is(':selected')){
    $('label span').text(' Must Enter Payment Option').css('color', '#c13c24');   
    $("button:contains('Register')").prop({
      disabled: true
    });
  }

  if($('.card').is(':selected')){
    let val = $('#cc-num').val();
    let valLength = val.length;
    if (isNaN(val) || val === '' || valLength < 13 || valLength > 16){
      $('#cc-num').css('border-color', '#c13c24');
      $("button:contains('Register')").prop({
        disabled: true
      });
    }else if(valLength > 13 && valLength < 16 && isNaN(val) === false){
      $('#cc-num').css('border-color', 'white');
    }
  }

  let zipVal = $('#zip').val();
  let zipValLength = zipVal.length;
  if (isNaN(zipVal) || zipValLength != 5){
    $('#zip').css('border-color', '#c13c24');
  }else if(zipValLength === 5 && isNaN(zipVal) === false) {
    $('#zip').css('border-color', 'white');
  }

  let cvvVal = $('#cvv').val();
  let cvvValLength = cvvVal.length;
  if (isNaN(cvvVal) || cvvValLength != 3){
    $('#cvv').css('border-color', '#c13c24');
  }else if(cvvValLength === 3 && isNaN(cvvVal) === false) {
    $('#cvv').css('border-color', 'white');
  }


});


//Subsequent handlers check validation when form is being filled out.
//Form inputs should be validated on keyup.
//And enables register button.
$('#name').keyup(function(){  
  $("button:contains('Register')").prop({
    disabled: false
  });
  let nameInput = $('#name').val();
  if (nameInput != ''){
    $('#name').css('border-color', 'white');
  }
});

$('#mail').keyup(function(){
  $("button:contains('Register')").prop({
    disabled: false
  });
  let emailInput = $('#mail').val();
  let aIndex = emailInput.indexOf('@');
  let pIndex = emailInput.lastIndexOf('.');
  if (aIndex > 1 && pIndex > aIndex +2 && pIndex +3 <= emailInput.length){
    $('#mail').css('border-color', 'white');
  }
});
                          
$(".activities input[type='checkbox']").click(function() {   
  $("button:contains('Register')").prop({
    disabled: false
  });
  if (mainConf.is(':checked') || jsFrameworks.is(':checked') || jsLibs.is(':checked') 
  || express.is(':checked') || node.is(':checked') || buildTools.is(':checked') || npm.is(':checked') ){
    $('legend span').text('').css('color', '#c13c24');
  }else{
    $('legend span').text(' Must Choose at Least 1').css('color', '#c13c24');
  }
}); 


$('.default').is(':selected');
if($('.default').is(':selected')){
}

$('#payment').change(function(){ 
  let value = $(this).val();
  if(value === 'paypal'){
    $("button:contains('Register')").prop({
      disabled: false
    });
    $('label span').text('').css('color', '#c13c24');
  } else if(value === 'bitcoin'){
    $("button:contains('Register')").prop({
      disabled: false
    });    
    $('label span').text('').css('color', '#c13c24'); 
  }
});

$('#cc-num').keyup(function(e){ 
  e.preventDefault();
  $("button:contains('Register')").prop({
    disabled: false
  });
  let val = $('#cc-num').val();
  let valLength = val.length;
  if (isNaN(val) || val === '' || valLength < 13 || valLength > 16){
    e.preventDefault();
    $('#cc-num').css('border-color', '#c13c24');
  }else if(valLength > 13 && valLength < 16 && isNaN(val) === false){
    $('#cc-num').css('border-color', 'white');
  }
}); 

$('#zip').keyup(function(){
  $("button:contains('Register')").prop({
    disabled: false
  }); 
  let val = $('#zip').val();
  let valLength = val.length;
  if(valLength === 5 && isNaN(val) === false) {
    $('#zip').css('border-color', 'white');
  }else if(valLength != 5 || isNaN(val) ) { 
    $('#zip').css('border-color', '#c13c24');
  }
});

$('#cvv').keyup(function(){ 
  $("button:contains('Register')").prop({
    disabled: false
  });
  let val = $('#cvv').val();
  let valLength = val.length;
  if (isNaN(val) || valLength != 3){
    $('#cvv').css('border-color', '#c13c24');
  } else if(valLength === 3 && isNaN(val) === false) {
    $('#cvv').css('border-color', 'white');
  }
});

$("button:contains('Register')").click(function(){
});
