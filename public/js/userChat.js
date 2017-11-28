$("#sendMessageBtn").click(function(){
	var saleId = window.location.href;
	console.log(saleId);
	var userInput = document.getElementById("messageContent").value;
	saleId = saleId.split('user/message/')[1];
	var lastIndex = saleId.indexOf('/');
	if(lastIndex == -1) lastIndex = saleId.length()
	saleId = saleId.substring(0, lastIndex);
	
	if(userInput.length > 255 || userInput.length < 1)	{
		alert("Please input a message");
	}	else	{
	    $.ajax({
			type: 'POST',
			url: "/user/message/",
			data: { 
				saleId: saleId,
				messageContent: userInput 
			},
			dataType: "text",
			success: function(resultData) { 
				alert("Save Complete") 
			}
		});
	}
});