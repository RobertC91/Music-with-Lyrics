let searchButton = document.getElementById("searchButton")
const YTAPIKEY = "AIzaSyBmZokR6M4RS1FdQxcZ4FtwhsAaviJtm_I"
let searchArtist = document.getElementById('artistSearch')
let searchSong = document.getElementById('songSearch')
let songQuery = (localStorage.getItem('songQuery'))
let artistQuery = (localStorage.getItem('artistQuery'))
let videoEmbedEl =  document.getElementById("player")

function fetchLyrics(songQuery, artistQuery) {
 
$.ajax({
  type:"GET",
  data: {
    apikey: "edb60ff7bf4e024322127eafa296dd31",
    q_track: songQuery,
    q_artist: artistQuery,
    format: "jsonp",
    callback: "jsonp_callback"
  },
  url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get",
  dataType: "jsonp",
  jsonpCallback: "jsonp_callback",
  contentType: "application/json",
  success: function(data) {
    console.log(data)
  },
  error: function(jqHXR, textStatus, errorThrown) {
    console.log(jqHXR)
  }

})

// Take lyrics from API and display on page
.then(function (data) {
  console.log(data)

  let lyricInput = $('#lyrics')
  lyricInput.addClass('lyricContainer');

let lyrics = data.message.body.lyrics.lyrics_body;
console.log(lyrics)
let lyricsEl = $('<p>')
lyricsEl.text(lyrics)
lyricInput.append(lyrics)
})
}


function fetchVideo( songQuery, artistQuery) {

let url = "https://youtube.googleapis.com/youtube/v3/search?channelType=any&maxResults=1&order=viewCount&q="+songQuery+artistQuery+"&key=" + YTAPIKEY;
 

 fetch(url)
.then((response) => response.json())
.then((data) => {
  console.log(data)
  let vidID = data.items[0].id.videoId;
  console.log(vidID)
  appendVideoPlayer(vidID)
  
})
}
function appendVideoPlayer(vidID){
  videoEmbedEl.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${vidID}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`

}


$(document).ready(function() {
  window.reload
  $("#searchButton").on('click', function() {
    let songQuery = searchSong.value;
    let artistQuery = searchArtist.value;
    localStorage.setItem('songQuery', songQuery);
    localStorage.setItem('artistQuery', artistQuery);
    // songQuery = songQuery.getItem('songQuery');
    // console.log(songQuery)
    fetchLyrics(artistQuery,songQuery)
    fetchVideo()
    appendVideoPlayer()
    });
});









