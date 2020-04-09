

$(document).ready(function(){
	var $form = $('form#test-form'),
	url = 'https://script.google.com/macros/s/AKfycbzmpKIWh_JPLFBaV2niWZMgWHtdmn-r6IscqqO5LAu7xzGQ5_p3/exec'	
	$.fn.serializeObject = function()
	{
	   var o = {};
	   var a = this.serializeArray();
	   $.each(a, function() {
	       if (o[this.name]) {
	           if (!o[this.name].push) {
	               o[this.name] = [o[this.name]];
	           }
	           o[this.name].push(this.value || '');
	       } else {
	           o[this.name] = this.value || '';
	       }
	   });
	   return o;
	};
	$('#submit-form').on('click', function(e) {
		
		console.log($form);
		e.preventDefault();
		var jqxhr = $.ajax({
			url: url,
			method: "GET",
			dataType: "json",
			data: $form.serializeObject()
		});
	})
	// console.log($(document));
	// console.log($("#main"))
});


