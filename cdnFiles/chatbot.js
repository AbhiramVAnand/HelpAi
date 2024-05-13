$(document).ready(function() {

	// Credentials
	var baseUrl = "http://127.0.0.1:5000/ask";
	
	var mybot = '<div class="container">'+
					'<div class="chatCont" id="chatCont">'+
								'<div class="bot_profile">'+
									'<img src="https://imgs.search.brave.com/BIliQ0SZarkqkARtMGDnvWZshFX0TcHww2Gg9d_1gpg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzIyLzM4LzMy/LzM2MF9GXzMyMjM4/MzI3N194Y1h6MUk5/dk9GdGRrN3BsaHNS/UXlqT0RqMDhpTlN3/Qi5qcGc" class="bot_p_img">'+
									'<div class="close">'+
                  '<svg width="60" height="72" viewBox="0 0 30 300" fill="none" xmlns="http://www.w3.org/2000/svg">'+
										'<path d="M49.5 60.1903L12.6103 97.08C11.23 98.4603 9.47338 99.1504 7.3403 99.1504C5.20722 99.1504 3.45057 98.4603 2.07034 97.08C0.690111 95.6998 0 93.9432 0 91.8101C0 89.677 0.690111 87.9203 2.07034 86.5401L38.9601 49.6504L2.07034 12.7607C0.690111 11.3804 0 9.62377 0 7.49069C0 5.35761 0.690111 3.60096 2.07034 2.22073C3.45057 0.840502 5.20722 0.150391 7.3403 0.150391C9.47338 0.150391 11.23 0.840502 12.6103 2.22073L49.5 39.1105L86.3897 2.22073C87.77 0.840502 89.5266 0.150391 91.6597 0.150391C93.7928 0.150391 95.5494 0.840502 96.9296 2.22073C98.3099 3.60096 99 5.35761 99 7.49069C99 9.62377 98.3099 11.3804 96.9296 12.7607L60.0399 49.6504L96.9296 86.5401C98.3099 87.9203 99 89.677 99 91.8101C99 93.9432 98.3099 95.6998 96.9296 97.08C95.5494 98.4603 93.7928 99.1504 91.6597 99.1504C89.5266 99.1504 87.77 98.4603 86.3897 97.08L49.5 60.1903Z" fill="black"/>'+
									'</svg>'+							
									'</div>'+
								'</div><!--bot_profile end-->'+
								'<div id="result_div" class="resultDiv"></div>'+
								'<div class="chatForm" id="chat-div">'+
									'<div class="spinner">'+
										'<div class="bounce1"></div>'+
										'<div class="bounce2"></div>'+
										'<div class="bounce3"></div>'+
									'</div>'+
									'<input type="text" id="chat-input" autocomplete="off" placeholder="Try typing here"'+ 'class="form-control bot-txt"/>'+
								'</div>'+
							'</div><!--chatCont end-->'+

							'<div class="profile_div">'+
								'<div class="row">'+
									'<div class="col-hgt">'+
										'<img src="https://imgs.search.brave.com/BIliQ0SZarkqkARtMGDnvWZshFX0TcHww2Gg9d_1gpg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzIyLzM4LzMy/LzM2MF9GXzMyMjM4/MzI3N194Y1h6MUk5/dk9GdGRrN3BsaHNS/UXlqT0RqMDhpTlN3/Qi5qcGc" class="img-circle img-profile">'+
									'</div><!--col-hgt end-->'+
								'</div><!--row end-->'+
							'</div>'+
					'</div>'+'<!--profile_div end-->';

	$("mybot").html(mybot);

	// ------------------------------------------ Toggle chatbot -----------------------------------------------
	$('.profile_div').click(function() {
		$('.profile_div').toggle();
		$('.chatCont').toggle();
		$('.bot_profile').toggle();
		$('.chatForm').toggle();
		document.getElementById('chat-input').focus();
	});

	$('.close').click(function() {
		$('.profile_div').toggle();
		$('.chatCont').toggle();
		$('.bot_profile').toggle();
		$('.chatForm').toggle();
	});

	// // Session Init (is important so that each user interaction is unique)--------------------------------------
	var session = function() {
		// Retrieve the object from storage
		if(sessionStorage.getItem('session')) {
			var retrievedSession = sessionStorage.getItem('session');
		} else {
			// Random Number Generator
			var randomNo = Math.floor((Math.random() * 1000) + 1);
			// get Timestamp
			var timestamp = Date.now();
			// get Day
			var date = new Date();
			var weekday = new Array(7);
			weekday[0] = "Sunday";
			weekday[1] = "Monday";
			weekday[2] = "Tuesday";
			weekday[3] = "Wednesday";
			weekday[4] = "Thursday";
			weekday[5] = "Friday";
			weekday[6] = "Saturday";
			var day = weekday[date.getDay()];
			// Join random number+day+timestamp
			var session_id = randomNo+day+timestamp;
			// Put the object into storage
			sessionStorage.setItem('session', session_id);
			var retrievedSession = sessionStorage.getItem('session');
		}
		return retrievedSession;
		// console.log('session: ', retrievedSession);
	}

	// Call Session init
	var mysession = session();


	// // on input/text enter--------------------------------------------------------------------------------------
	$('#chat-input').on('keyup keypress', function(e) {
		var keyCode = e.keyCode || e.which;
		var text = $("#chat-input").val();
		if (keyCode === 13) {
			if(text == "" ||  $.trim(text) == '') {
				e.preventDefault();
				return false;
			} else {
				$("#chat-input").blur();
				setUserResponse(text);
				send(text);
				e.preventDefault();
				return false;
			}
		}
	});

	// //------------------------------------------- Send request to API.AI ---------------------------------------
	function send(text) {
		const options = {
		  method: 'POST', // Specify POST method
		  headers: {
			'Content-Type': 'application/json' // Set content type for JSON data
		  },
		  body: JSON.stringify({ query: text }) // Convert text to JSON for request body
		};
		fetch(baseUrl,options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            console.log({responseData: data});
            setBotResponse(data.answer);
            // Assuming main function handles the response
        })
		.catch(error => {
			console.log({msg:error.message})
			console.error(error);  // Handle errors
		  });
	  }
	  

	// //------------------------------------------- Main function ------------------------------------------------
	function main(data) {
		var action = data.result.action;
		var speech = data.result.fulfillment.speech;
		// use incomplete if u use required in api.ai questions in intent
		// check if actionIncomplete = false
		var incomplete = data.result.actionIncomplete;
		if(data.result.fulfillment.messages) { // check if messages are there
			if(data.result.fulfillment.messages.length > 0) { //check if quick replies are there
				var suggestions = data.result.fulfillment.messages[1];
			}
		}
		switch(action) {
			// case 'your.action': // set in api.ai
			// Perform operation/json api call based on action
			// Also check if (incomplete = false) if there are many required parameters in an intent
			// if(suggestions) { // check if quick replies are there in api.ai
			//   addSuggestion(suggestions);
			// }
			// break;
			default:
				setBotResponse(speech);
				if(suggestions) { // check if quick replies are there in api.ai
					addSuggestion(suggestions);
				}
				break;
		}
	}


	//------------------------------------ Set bot response in result_div -------------------------------------
	function setBotResponse(val) {
		setTimeout(function(){
			if($.trim(val) == '') {
				console.log({hereisThevalue:val})
				val = 'I couldn\'t get that. Let\' try something else!'
				var BotResponse = '<p class="botResult">'+val+'</p><div class="clearfix"></div>';
				$(BotResponse).appendTo('#result_div');
			} else {
				val = val.replace(new RegExp('\r?\n','g'), '<br />');
				var BotResponse = '<p class="botResult">'+val+'</p><div class="clearfix"></div>';
				$(BotResponse).appendTo('#result_div');
			}
			scrollToBottomOfResults();
			hideSpinner();
		}, 500);
	}


	//------------------------------------- Set user response in result_div ------------------------------------
	function setUserResponse(val) {
		var UserResponse = '<p class="userEnteredText">'+val+'</p><div class="clearfix"></div>';
		$(UserResponse).appendTo('#result_div');
		$("#chat-input").val('');
		scrollToBottomOfResults();
		showSpinner();
		$('.suggestion').remove();
	}


	//---------------------------------- Scroll to the bottom of the results div -------------------------------
	function scrollToBottomOfResults() {
		var terminalResultsDiv = document.getElementById('result_div');
		terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
	}


	//---------------------------------------- Ascii Spinner ---------------------------------------------------
	function showSpinner() {
		$('.spinner').show();
	}
	function hideSpinner() {
		$('.spinner').hide();
	}


	//------------------------------------------- Suggestions --------------------------------------------------
	function addSuggestion(textToAdd) {
		setTimeout(function() {
			var suggestions = textToAdd.replies;
			var suggLength = textToAdd.replies.length;
			$('<p class="suggestion"></p>').appendTo('#result_div');
			$('<div class="sugg-title">Suggestions: </div>').appendTo('.suggestion');
			// Loop through suggestions
			for(i=0;i<suggLength;i++) {
				$('<span class="sugg-options">'+suggestions[i]+'</span>').appendTo('.suggestion');
			}
			scrollToBottomOfResults();
		}, 1000);
	}

	// on click of suggestions get value and send to API.AI
	$(document).on("click", ".suggestion span", function() {
		var text = this.innerText;
		setUserResponse(text);
		send(text);
		$('.suggestion').remove();
	});
	// Suggestions end -----------------------------------------------------------------------------------------
});
