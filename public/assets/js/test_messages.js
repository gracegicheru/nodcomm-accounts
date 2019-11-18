var telInput = $("#tel"),
  errorMsg = $("#error-msg"),
  validMsg = $("#valid-msg");




var reset = function() {
  telInput.removeClass("error");
  errorMsg.addClass("hide");
  validMsg.addClass("hide");
  telInput.css("border-color", "");
};


// on blur: validate
telInput.blur(function() {
  reset();
  
  if ($.trim(telInput.val())) {
	  telInput.val(telInput.intlTelInput("getNumber"));
    if (telInput.intlTelInput("isValidNumber")) {
      validMsg.removeClass("hide");
   $(':input[type="submit"]').prop('disabled', false);
   } else {
	  $(':input[type="submit"]').prop('disabled', true);
      telInput.addClass("error");
      errorMsg.removeClass("hide");
	  telInput.css("border-color", "red");

    }
  }
});


// on keyup / change flag: reset
telInput.on("keyup change", reset);
$("#message").keyup(function(){
	$(this).css("border-color", "");
	var msg = $(this).val();
    var count = msg.length;
    if(count > 80){
    	var msg2 = msg.substr(0, 80);
    	$(this).val(msg2);
    	$("#msg-count").html(80);
    }else{
    	$("#msg-count").html(count);
    }

});
$("#sendSMSform").submit(function(evt){
	evt.preventDefault();

	var btn = $("#sendSMSbtn"),
		form = $(this),
		txt = $("#message").val();
	 if( $("#tel").val() ==''){
		$("#tel").css("border-color", "red");
	}
	else if(txt == '' ){
		$("#message").css("border-color", "red");
	}else{
			var phone =telInput.intlTelInput("getNumber");
			
			var formdata = form.serializeArray();
			formdata.push({name: "phone",
			value: phone});
		$.ajax({
			type:  "post",
			data:  formdata,
			url:   form.attr("action"),
			dataType:  "json",
			beforeSend:  function(){
				btn.prop("disabled", true).html('<i class="fa fa-spin fa-spinner"></i> Sending');
			},
			success:  function(res){
				if(res.status == "success"){
					btn.prop("disabled", false).html('<i class="fa fa-send" aria-hidden="true"></i> Send SMS');
					$("#message").val('');
					$("#msg-count").val('0');
				  var oTableToUpdate =  $('#dataTable').dataTable( { bRetrieve : true } );
				 oTableToUpdate .fnDraw();
				$('#dataTable').dataTable().fnClearTable();

							    var i=1;
								$.each(res.details, function(key, value) {

									 $('#dataTable').dataTable().fnAddData([
						  
									  ''!=null ? i : "",
									  ''!=null ? value.phone  : "",
									  ''!=null ? value.message  : "",
									  ''!=null ? value.company  : ""
											]);
									i++;
								}); 
					$.gritter.add({
						title: "<strong style='color:#3ec291'>Success!</strong>",
						text: 'The message has been sent successfully',
						sticky: false,
						time: '',
						class_name: 'gritter-success'
					});
				}else{
					btn.prop("disabled", false).html('<i class="fa fa-send" aria-hidden="true"></i> Send SMS');
					$.gritter.add({
					title: "<strong style='color:#fb5a43'>Oops!</strong>",
					text:  res.details,
					sticky: false,
					time: '',
					class_name: 'gritter-danger'
				});
				}
			},
			error:  function(err){
				btn.prop("disabled", false).html('<i class="fa fa-send" aria-hidden="true"></i> Send SMS');
				$.gritter.add({
					title: "<strong style='color:#fb5a43'>Oops!</strong>",
					text: 'An error occured when sending the message. Please try again.',
					sticky: false,
					time: '',
					class_name: 'gritter-danger'
				});
			}
		});
	}
}); 