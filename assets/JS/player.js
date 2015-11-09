var audioPlayer = {
  audioData:{
    currentSong: -1,
    songs:[]
  },

//UI
load: function(){
  this.data = data.songs;
  data.songs.forEach(function(val, i){
     $("#playlist").append("<li class='list-group-item'>" + val.artist + "-" + val.songName);
})
},
changeCurrentSongEffect: function(options){
  if(options.play){
    $("#playlist .list-group-item").removeClass("list-group-item-success").find("span").remove();
    $("#playlist .list-group-item").eq(this.audioData.currentSong).addClass("list-group-item-success").removeClass("list-group-item-danger").append("<span class='glyphicon glyphicon-headphones'>");
  }
  if(options.end){
    $("#playlist . list-group-item").eq(this.audioData.currentSong).removeClass("list-group-item-success .glyphicon-headphones").addClass("list-group-item-danger");
}
},
  playSong:function(audio){
    this.changeCurrentSongEffect({
      end: 1
    });
    audio.onended = function(){
      audioPlayer.changeCurrentSongEffect({
          end : 1
      });
      audioPlayer.changeStatusCode("Finished Listening to", true);
    }
    this.changeStatusCode("Playing", true, audio);
  },
  changeStatusCode: function(statusMessage, addSongName, scope){
    if(addSongName){
      statusMessage += " " + $("#playlist .list-group-item").eq(this.audioData.currentSong).text();
    }
    this.speak(statusMessage, scope);
    $(".status").fadeOut("slow").html(statusMessage).fadeIn("slow");
  },
    changeLastCommand: function(cmd){
      $(".l-command").fadeOut("slow").text(cmd).fadeIn("slow");
    },
    toggelSpinner: function(show){
      (show || false) ?
    }


};