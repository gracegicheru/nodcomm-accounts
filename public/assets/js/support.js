	$.ajaxSetup({
	    headers: {
	        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	    }
	});
$("#sendmessageform").submit(function(evt){
	evt.preventDefault();

	var btn = $("#sendmessagebtn"),
		form = $(this),
		txt = $("#message").val();

	if(txt == '' ){
		$("#message").css("border-color", "red");
	}else{

		$.ajax({
			type:  "post",
			data:  form.serialize(),
			url:   form.attr("action"),
			dataType:  "json",
			beforeSend:  function(){
				btn.prop("disabled", true).html('<i class="fa fa-spin fa-spinner"></i> Sending');
			},
			success:  function(res){
				if(res.status == "success"){
					btn.prop("disabled", false).html('<i class="fa fa-send" aria-hidden="true"></i> Send');
					$("#message").val('');
				  var oTableToUpdate =  $('#dataTable').dataTable( { bRetrieve : true } );
				 oTableToUpdate .fnDraw();
				$('#dataTable').dataTable().fnClearTable();

							    var i=1;
								$.each(res.details, function(key, value) {

									 $('#dataTable').dataTable().fnAddData([
						  
									  ''!=null ? i : "",
									  ''!=null ? value.support_description  : "",
									  ''!=null ? value.user  : ""
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
					btn.prop("disabled", false).html('<i class="fa fa-send" aria-hidden="true"></i> Send');
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
					btn.prop("disabled", false).html('<i class="fa fa-send" aria-hidden="true"></i> Send');
				$.gritter.add({
					title: "<strong style='color:#fb5a43'>Oops!</strong>",
					text: 'An error occured. Please try again.',
					sticky: false,
					time: '',
					class_name: 'gritter-danger'
				});
			}
		});
	}
}); 
 function marksolved(id){
var answer = confirm('Are you sure you want to mark this message solved?');
if (answer)
{
			var btn =$('#marksolvedbtn'+id);

	        $.ajax({
            type: "POST",
            url: server+"/support/mark-solved",
            data: {'id': id},
            dataType:"json",
            beforeSend: function() {

            btn.prop("disabled", true).html('<i class="fa fa-spinner fa-spin"></i>');        
            },
            cache: false,
            success: function(data) {
				
                 btn.prop("disabled", false).html('<i class="fa fa-check" aria-hidden="true"></i>'); 
               if(data.status=='error'){
					$.gritter.add({
					title: "<strong style='color:#fb5a43'>Oops!</strong>",
					text:  data.details,
					sticky: false,
					time: '',
					class_name: 'gritter-danger'
				});
               }else{
					$.gritter.add({
					title: "<strong style='color:#3ec291'>Success!</strong>",
					text:  'Message marked solved successfully .',
					sticky: false,
					time: '',
					class_name: 'gritter-success'
				});	
				  var oTableToUpdate =  $('#dataTable').dataTable( { bRetrieve : true } );
				 oTableToUpdate .fnDraw();
				$('#dataTable').dataTable().fnClearTable();
									var i=1;
									var link = '';
									var status = '';
									$.each(data.details, function(key, value) {
									if(value.solved == 1){
										link ='<a  data-toggle="tooltip" data-placement="top" title="" data-original-title="Mark Unsolved" onclick="markunsolved('+value.id+')"  class="btn btn-xs btn-danger" style="margin-right:3px;" id="markunsolvedbtn'+value.id+'"><i class="fa fa-times" aria-hidden="true"></i></a>';
										status = 'Solved';
									}else{
										link ='<a  data-toggle="tooltip" data-placement="top" title="" data-original-title="Mark Solved" onclick="marksolved('+value.id+')"  class="btn btn-xs btn-success" style="margin-right:3px;" id="marksolvedbtn'+value.id+'"><i class="fa fa-check" aria-hidden="true"></i></a>';
										status = 'Not Solved';
									}

									 $('#dataTable').dataTable().fnAddData([
						  
									  ''!=null ? i : "",
									  ''!=null ? value.support_description  : "",
									  ''!=null ? value.company  : "",
									  ''!=null ? value.user  : "",
									  status,
									  link+'<a  data-toggle="tooltip" data-placement="top" title="" data-original-title="Reply"  class="btn btn-xs btn-info" style="margin-right:3px;" href="'+server+'/support/reply/'+value.id+'"><i class="fa fa-reply" aria-hidden="true"></i></a>'
											]);
									i++;
								}); 

                    }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) { // on error..

                 btn.prop("disabled", false).html('<i class="fa fa-check" aria-hidden="true"></i>'); 
                    $.gritter.add({
					title: "<strong style='color:#fb5a43'>Oops!</strong>",
					text:  "An error occurred.Please try again",
					sticky: false,
					time: '',
					class_name: 'gritter-danger'
				});
					}
                });
}
else
{
  return false;
}
 }
  function markunsolved(id){
var answer = confirm('Are you sure you want to mark this message unsolved?');
if (answer)
{
			var btn =$('#markunsolvedbtn'+id);

	        $.ajax({
            type: "POST",
            url: server+"/support/mark-unsolved",
            data: {'id': id},
            dataType:"json",
            beforeSend: function() {

            btn.prop("disabled", true).html('<i class="fa fa-spinner fa-spin"></i>');        
            },
            cache: false,
            success: function(data) {
				
                 btn.prop("disabled", false).html('<i class="fa fa-times" aria-hidden="true"></i>'); 
               if(data.status=='error'){
					$.gritter.add({
					title: "<strong style='color:#fb5a43'>Oops!</strong>",
					text:  data.details,
					sticky: false,
					time: '',
					class_name: 'gritter-danger'
				});
               }else{
					$.gritter.add({
					title: "<strong style='color:#3ec291'>Success!</strong>",
					text:  'Message marked unsolved successfully .',
					sticky: false,
					time: '',
					class_name: 'gritter-success'
				});	
				  var oTableToUpdate =  $('#dataTable').dataTable( { bRetrieve : true } );
				 oTableToUpdate .fnDraw();
				$('#dataTable').dataTable().fnClearTable();
									var i=1;
									var link = '';
									var status = '';
									$.each(data.details, function(key, value) {
									if(value.solved == 1){
										link ='<a  data-toggle="tooltip" data-placement="top" title="" data-original-title="Mark Unsolved" onclick="markunsolved('+value.id+')"  class="btn btn-xs btn-danger" style="margin-right:3px;" id="markunsolvedbtn'+value.id+'"><i class="fa fa-times" aria-hidden="true"></i></a>';
										status = 'Solved';
									}else{
										link ='<a  data-toggle="tooltip" data-placement="top" title="" data-original-title="Mark Solved" onclick="marksolved('+value.id+')"  class="btn btn-xs btn-success" style="margin-right:3px;" id="marksolvedbtn'+value.id+'"><i class="fa fa-check" aria-hidden="true"></i></a>';
										status = 'Not Solved';
									}

									 $('#dataTable').dataTable().fnAddData([
						  
									  ''!=null ? i : "",
									  ''!=null ? value.support_description  : "",
									  ''!=null ? value.company  : "",
									  ''!=null ? value.user  : "",
									  status,
									  link+'<a  data-toggle="tooltip" data-placement="top" title="" data-original-title="Reply"  class="btn btn-xs btn-info" style="margin-right:3px;" href="'+server+'/support/reply/'+value.id+'"><i class="fa fa-reply" aria-hidden="true"></i></a>'
											]);
									i++;
								}); 

                    }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) { // on error..

                 btn.prop("disabled", false).html('<i class="fa fa-times" aria-hidden="true"></i>'); 
                    $.gritter.add({
					title: "<strong style='color:#fb5a43'>Oops!</strong>",
					text:  "An error occurred.Please try again",
					sticky: false,
					time: '',
					class_name: 'gritter-danger'
				});
					}
                });
}
else
{
  return false;
}
 }