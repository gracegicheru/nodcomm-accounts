$(document).ready(function() {
	setInterval(online,3000);
});

function online(){
	           
				$.ajax({
				url: server+"/dashboard/online",
				type: "GET",
				dataType:"json",
				success: function(data){ 
					$("#companies_count").html(data.companies_count);
					$("#users_count").html(data.users_count);
					$("#visitors_count").html(data.visitors_count);
					$("#messages_count").html(data.messages_count);

				}
			})
}