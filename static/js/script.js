 $('.profile_div').click(function () {
     switchRecognition();
 });

var transcription;

function setUserResponse(transcription) {
    
    var UserResponse = '<img class="userAvatar" src=' + "./static/img/userAvatar.jpg" + '><p class="userMsg">' + transcription + ' </p><div class="clearfix"></div>';
	$(UserResponse).appendTo(".chats").show("slow");

	$(".usrInput").val("");
    scrollToBottomOfResults();
    $(".suggestions").remove();
    
}

function scrollToBottomOfResults() {

	var terminalResultsDiv = document.getElementById("chats");
	terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}


var recognition;

function startRecognition() {

    console.log("Start")
	recognition = new webkitSpeechRecognition();

	recognition.onstart = function(event) {

        console.log("Update");
		updateRec();
	};
	
	recognition.onresult = function(event) {
	
		var text = "";
	
		for (var i = event.resultIndex; i < event.results.length; ++i) {
			text += event.results[i][0].transcript;
		}
	
		setUserResponse(text);
		stopRecognition();
	
	};
	
	recognition.onend = function() {
		stopRecognition();
	};
	
	recognition.lang = "en-US";
	recognition.start();

}



function stopRecognition() {
	if (recognition) {
        console.log("Stop Recog");
		recognition.stop();
		recognition = null;
	}
	updateRec();
}



function switchRecognition() {
	if (recognition) {
        console.log(" Stop if");
		stopRecognition();
	} else {
		startRecognition();
	}
}


function setInput(text) {
	$(".input").val(text);
	
    send(text);
	
    $(".input").val("");
    
}


function updateRec() {
	

	if (recognition) {
		$("#rec").attr("src", "Images/MicrophoneOff.png");
	} else {
		$("#rec").attr("src", "Images/microphone.png");

	}
}

function speechResponse(message)
{
	var msg = new SpeechSynthesisUtterance();
	var voices = window.speechSynthesis.getVoices();
	msg.voice = voices[10];
	msg.voiceURI = 'anna';
	msg.name = "Fiona";
	msg.localService = true;
  	msg.text = message;
  	msg.lang = "en-US";
	msg.rate = 1;
	msg.volume = 1;
	msg.pitch = 2
  	window.speechSynthesis.speak(msg);
}

var trans="hello meet";

speechResponse(trans);


// var msg = new SpeechSynthesisUtterance();
// var voices = window.speechSynthesis.getVoices();
// msg.voice = voices[10]; // Note: some voices don't support altering params

