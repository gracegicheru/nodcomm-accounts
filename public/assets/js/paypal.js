	/*if(env=='sandbox'){
		x={ sandbox:paypal_client_ID}
	}else{
	   x={  production:paypal_client_ID}
	}
    paypal.Button.render({

        env: env, // sandbox Or 'production'

        client:x,

        commit: true, // Show a 'Pay Now' button

        payment: function(data, actions) {
            return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            amount: { total: amount, currency: 'USD' }
                        }
                    ]
                }
            });
        },

        onAuthorize: function(data, actions) {
			
            return actions.payment.execute().then(function(payment) {

				alert('Thank you for paying for our services');

                // The payment is complete!
                // You can now show a confirmation message to the customer
				var formdata = $('#paymentform').serializeArray();
				formdata.push({name: "txn_id",
				value: payment.id});
				formdata.push({name: "cart",
				value:payment.cart});
				formdata.push({name: "payment_gross",
				value: payment.transactions[0].amount["total"]});
				formdata.push({name: "currency_code",
				value: payment.transactions[0].amount["currency"]});
				formdata.push({name: "payment_method",
				value: payment.payer.payment_method});
				formdata.push({name: "payment_date",
				value: payment.create_time});
			    formdata.push({name: "pstatus",
				value: payment.payer.status});
				formdata.push({name: "payer_id",
				value: payment.payer.payer_info["payer_id"]});
				formdata.push({name: "email",
				value: payment.payer.payer_info["email"]});
				

				$.ajax({
				type: "POST",
				url: $("#paymentform").attr("action"),
				data: formdata,
				dataType:"json",
				beforeSend: function() {
					
				},
				cache: false,
				success: function(data) {
					if(data.status=='success'){
					window.setTimeout(function () {
                           window.location.replace(data.details);
                        }, 1000);
					}

						},
						error: function(XMLHttpRequest, textStatus, errorThrown) { // on error..

						}
					});
		   });
        }

    }, '#paypal-button');*/
	
	       paypal.Button.render({
           locale: 'en_US',
           env: 'production', // Optional: specify 'sandbox' environment
          //env: 'sandbox',
	client: {
		// sandbox: 'AT43_CN0WvUt3aPEVUjmDuRefkQWQFx5WbQ-FnaGXsc2plbHX-PCr9vNz_sGJEtRATkZTNJX8hT9klUs'
		production: 'AFcWxV21C7fd0v3bYYYRCpSSRl31A8WOtZ0dFFHQgjAonMhilEBcoxmi'
		//sandbox: 'Abeif96sEFOLYyggw3dCdDf-bnhQTsj2bxS4a--dQGpNnZ8Wl61B_fBKNe-pt4cs261VcGq2IQPuGaUg'
		//sandbox: 'ASep4eFprUhg7bGvWdN8Pis6TAkjt3EFJFNdqTJgeZ-vE29gObLdcWCWCaC8eg4_4ozjKYyFW_4xPGNZ'
	},
           style: {
       color: 'blue',
       shape: 'rect',
       label: 'checkout'
           },

           payment: function(resolve, reject) {

              //return paypal.request.post('PaypalCheckout/createPayment',{'amt':'<?php echo $_amt ?>','orderno':'<?php echo $order_no; ?>','curr':'<?php echo $order_currency; ?>','order_id':'<?php echo $order_id; ?>','doc_name':"<?php echo $doc_name; ?>"})
             return paypal.request.post(server+'paypalcheckout',{'amount':amount})
			 .then(function(res) {
               console.log(res);
               	return res.TOKEN;
           	});
           },

           onAuthorize: function(data, actions) {
           console.log(JSON.stringify(data));
           console.log(data.paymentToken);
                return paypal.request.post(server+'completepayment', {
               paymentToken: data.paymentToken,
               payerId: data.payerID
           }).then(function (res) {
           console.log(JSON.stringify(res));
           

               location.href=res.redirect;
               
           });
           }
           
       }, '#paypal-button');
