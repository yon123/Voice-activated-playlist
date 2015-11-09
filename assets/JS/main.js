$(function(){
  audioPlayer.load();
  if(window['webkitSpeechRecognition']){
    var speechRecognizer = new webkitSpeechRecognition();
    // recognition will not end until the user stops speaking if set to true
    speechRecognizer.continuous = true;
    // process the request while the speaker is speaking
    //and their commands are final
    speechRecognizer.interimResults = true;
    speechRecognizer.language ="en-US";
    var currentCommands = ['play', 'stop', 'pause', 'next', 'previous'],
      results = [],
      timeoutSet = false;

    speechRecognizer.onResult = function(evt){
      audioPlayer.toggleSpinner(true);
      results.push(evt.results);
      if(!timeoutSet){
        setTimeout(function(){
          timeoutSet = false;
          results.reverse();
          try {
            results.forEach(function(val, i){
              var el =val[0][0].transcript.toLowerCase();
              if(currentCommands.indexOf(el.split(" ")[0]) !== -1) {
                speechRecognizer.abort();
                audioPlayer.processCommands(el);
                audioPlayer.toggleSpinner();
                results = [];
                throw new BreakLoopException;
              }

              if (i === 0){
                audioPlayer.processCommands(el);
                speechRecognizer.abort();
                audioPlayer.toggleSpinner();
                results = [];
              }
            });
          }
          catch(e) {return e;}
        }, 3000)
      }

      timeoutSet = true;
    }

    speechRecognizer.onend = function(){
      speechRecognizer.start();
    }
    speechRecognizer.start();
  }
  else {
    alert('Your Browser Does Not Support The Web Speech API');
  }
});